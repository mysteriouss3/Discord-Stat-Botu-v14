const { GuildParentStats } = require("../../../../Providers/Database/Models/General");
const { ChannelType } = require("discord.js");
const { TimeManager } = require("../../Extras/TimeManager");
class GetGuild{
    static async GuildTopChannel(guildID,SliceNumber,Period){
        const guild = await client.guilds.fetch(guildID)
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);
        const voiceChannelIDs = voiceChannels.map(channel => channel.id);

        const aggregationPipeline = [
            {
              $match: {
                guildID: guildID,
                channelID: { $in: voiceChannelIDs },
                [`allVoiceGuild.${Period}ChannelDuration`]: { $exists: true } // Bu satır, belirtilen dönemde veri bulunmayanları filtreler
              }
            },
            {
              $sort: {
                [`allVoiceGuild.${Period}ChannelDuration`]: -1
              }
            },
            {
              $limit: SliceNumber
            },
            {
              $project: {
                channelID: 1,
                TotalChannelDuration: {
                  $ifNull: [`$allVoiceGuild.${Period}ChannelDuration`, 0]
                }
              }
            }
          ];
          
          const result = await GuildStats.aggregate(aggregationPipeline).exec();

            const topChannelList = result.map((guildData, index) => {
                const channelID = guildData.channelID;
                const channelDuration = guildData[Period + 'ChannelDuration']
                const totalChannelDuration = TimeManager.Format(channelDuration ? channelDuration : 0);
                return `\` ${index + 1} \` <#${channelID}> : \`${totalChannelDuration}\``;
            });
        
        return topChannelList.join('\n');
    }
    static async GuildTopMessage(guildID,SliceNumber,Period){
        const guild = await client.guilds.fetch(guildID)
        const voiceChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText);
        const voiceChannelIDs = voiceChannels.map(channel => channel.id);

        const GuildDataQuery = GuildStats.find({ guildID: guildID, channelID: voiceChannelIDs })
        .sort({ [`allMessageGuild.${Period}Message`]: -1 })
        .limit(SliceNumber)
        .lean();

        const GuildData = await GuildDataQuery.exec();

        const topChannelList = GuildData.map((guildData, index) => {
            const channelID = guildData.channelID;
            const totalChannelMessage = guildData.allMessageGuild[Period + 'Message'] ?? 0
            return `\` ${index + 1} \` <#${channelID}> : \`${totalChannelMessage} Mesaj\``;

        });
        return topChannelList.join('\n');
    }

    static async GetTotalServerStats(guildID) {
        try {
            
            const guild = await client.guilds.fetch(guildID);
    
            if (!guild) {
                throw new Error("Sunucu bulunamadı. - GetTotalServerStats()");
            }
            const voiceChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildText);
            const voiceChannelIDs = voiceChannels.map(channel => channel.id);
    
            const GuildDataQuery = GuildStats.aggregate([
                { $match: { guildID: guildID, channelID: { $in: voiceChannelIDs } } },
                { $group: { _id: null, 
                    totalStreamerDuration: { $sum: "$allStreamerGuild.TotalChannelDuration" },
                    dailyStreamerDuration: { $sum: "$allStreamerGuild.DailyChannelDuration" },
                    weeklyStreamerDuration: { $sum: "$allStreamerGuild.WeeklyChannelDuration" },
                    totalMessage: { $sum: "$allMessageGuild.TotalMessage" },
                    dailyMessage: { $sum: "$allMessageGuild.DailyMessage" },
                    weeklyMessage: { $sum: "$allMessageGuild.WeeklyMessage" },
                    totalVoiceDuration: { $sum: "$allVoiceGuild.TotalChannelDuration" },
                    dailyVoiceDuration: { $sum: "$allVoiceGuild.DailyChannelDuration" },
                    weeklyVoiceDuration: { $sum: "$allVoiceGuild.WeeklyChannelDuration" },
                    totalCameraDuration: { $sum: "$allCameraGuild.TotalChannelDuration" },
                    dailyCameraDuration: { $sum: "$allCameraGuild.DailyChannelDuration" },
                    weeklyCameraDuration: { $sum: "$allCameraGuild.WeeklyChannelDuration" },
                }}
            ]);
            const result = await GuildDataQuery.exec();

            const statsData = result.length > 0 ? result[0] : {};
            const formattedStatsData = {
                Streamer: {
                    Total: statsData.totalStreamerDuration !== undefined ? TimeManager.ChartFormat(statsData.totalStreamerDuration) : undefined,
                    Günlük: statsData.dailyStreamerDuration !== undefined ? TimeManager.ChartFormat(statsData.dailyStreamerDuration) : undefined,
                    Haftalık: statsData.weeklyStreamerDuration !== undefined ? TimeManager.ChartFormat(statsData.weeklyStreamerDuration) : undefined,
                    
                },
                Mesaj: {
                    Total: statsData.totalMessage !== undefined ? statsData.totalMessage : undefined,
                    Günlük: statsData.dailyMessage !== undefined ? statsData.dailyMessage : undefined,
                    Haftalık: statsData.weeklyMessage !== undefined ? statsData.weeklyMessage : undefined,
                    
                },
                Ses: {
                    Total: statsData.totalVoiceDuration !== undefined ? TimeManager.ChartFormat(statsData.totalVoiceDuration) : undefined,
                    Günlük: statsData.dailyVoiceDuration !== undefined ? TimeManager.ChartFormat(statsData.dailyVoiceDuration) : undefined,
                    Haftalık: statsData.weeklyVoiceDuration !== undefined ? TimeManager.ChartFormat(statsData.weeklyVoiceDuration) : undefined,
                    
                },
                Camera: {
                    Total: statsData.totalCameraDuration !== undefined ? TimeManager.ChartFormat(statsData.totalCameraDuration) : undefined,
                    Günlük: statsData.dailyCameraDuration !== undefined ? TimeManager.ChartFormat(statsData.dailyCameraDuration) : undefined,
                    Haftalık: statsData.weeklyCameraDuration !== undefined ? TimeManager.ChartFormat(statsData.weeklyCameraDuration) : undefined,
                }
            };
            
            return formattedStatsData;
        } catch (error) {
            console.error("Hata oluştu:", error);
            return null;
        }
    }
    /**
     * - Sunucu'nun Kaç günlük verisi olduğunu gün olarak döndüren asenkron bir işlev.
     * - guildID girilmesi zorunludur yoksa undefined dönecektir.
     *
     * @param {string} guildID 
     * @returns {Promise<number|undefined>} - Sunucu'nun verilerine göre kaç gün önce verisi olduğu. Eğer sunucu verileri bulunamazsa, undefined döner.
     * @throws {Error} - Eksik veya geçersiz parametreler olduğunda hata fırlatır.
     */
    static async GetGuildDataAge(guildID) {
        if (!guildID) {
            throw new Error("Eksik veya geçersiz parametreler. - GetGuildDataAge()");
        }

        try {
            const guildData = await GuildStats.findOne({ guildID: guildID }).sort({ "date": 1 });

            if (guildData && guildData.date) {
                const firstDate = guildData.date; // İlk veri tarihi
                const today = new Date(); // Şu anki tarih

                // İlk tarih ile şu anki tarih arasındaki farkı hesaplayalım
                const timeDifferenceMs = today - firstDate;
                const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
                const hoursDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
                const minutesDifference = Math.floor(timeDifferenceMs / (1000 * 60));

                if (daysDifference === 0) {
                    if (hoursDifference === 0) {
                        return minutesDifference + " dakika";
                    } else {
                        return hoursDifference + " saat";
                    }
                } else {
                    return daysDifference + " gün " + (hoursDifference % 24) + " saat";
                }
            } else {
                // Sunucunun verisi bulunamadıysa undefined döndürelim
                return undefined;
            }
        } catch (error) {
            throw new Error("Veritabanı işlemi hatası: " + error.message);
        }
    }
    static async ParentStatGet(guildID,ParentName) {
        if (!ParentName) {
            throw new Error('ParentName parametresi eksik.');
        }
        
        if (!["SunucuWork", "Etkinlik", "Afk", "Register","Public","Streamer","YetkiliAlim","DC","VK","SorunCozme","Özel","Oyun","Diğer"].includes(ParentName)) {
            throw new Error('Geçersiz ParentName parametresi.');}
            return await this.ParentDataGet(guildID,ParentName);
    }
      
    static async ParentDataGet(guildID,categoryName) {
        if (!categoryName) {
          throw new Error('categoryName parametresi eksik.');
        }
        
        const ParentData = await GuildParentStats.findOne({ guildID: guildID, ParentName: categoryName });
        if (!ParentData) {
          throw new Error('Veritabanında istenen kategori bulunamadı: ' + categoryName);
        }
        
        const Top = {
          TotalDuration: TimeManager.Format(ParentData?.allVoiceGuild?.TotalChannelDuration ?? 0),
          DailyDuration: TimeManager.Format(ParentData?.allVoiceGuild?.DailyChannelDuration ?? 0),
          WeeklyDuration: TimeManager.Format(ParentData?.allVoiceGuild?.WeeklyChannelDuration ?? 0),
        };
      
        return Top;
    } 
}
module.exports = { GetGuild };