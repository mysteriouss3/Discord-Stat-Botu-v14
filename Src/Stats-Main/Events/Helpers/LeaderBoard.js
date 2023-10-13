const { Events, EmbedBuilder, ChannelType, PermissionsBitField: { Flags }, Message } = require("discord.js");
const { GetTop } = require('../../Extras/ModelUser/Get.Top');
const { TimeManager } = require('../../Extras/TimeManager');

const serverQueue = [];

/**
 * @param {Message} message 
 * @param {Client} client
 */
module.exports = async (client) => {
    // Her sunucudaki mesajları güncellemek için döngüyü başlat
    setInterval(async () => {
        client.guilds.cache.forEach(guild => serverQueue.push(guild.id));

        if (serverQueue.length === 0) {
            // Kuyruk boşsa, baştan başlat
            serverQueue.push(...client.guilds.cache.map(guild => guild.id));
        }

        // Kuyruktan bir sonraki sunucu ID'sini al
        const serverId = serverQueue.shift();

        await fetchDataAndSend(serverId);

    }, 1 * 60 * 1000); // 40 saniye

    let leaderboardMessages = {};
    let fetchedMessages = '';
    let LeaderBoardMessage = '';
    let LeaderBoardikiMessage = '';
    let channel = '';
    let LeaderBoard = '';
    let LeaderBoardiki = '';

    const channelName = "leaderboard-4";

    async function fetchDataAndSend(guildId) {
        try {

            const guild = await client.guilds.fetch(guildId);
            await new Promise(resolve => setTimeout(resolve, 200));

            if(guild.id === '1140657190051516468') return;

            const existingChannel = guild.channels.cache.find(ch => ch.name === channelName);
            if (!existingChannel) {
                try {
                    guild.channels.create({
                        name: channelName,
                        type: ChannelType.GuildText,
                        permissionOverwrites: [
                            {
                                id: guild.roles.everyone.id,
                                deny: [Flags.SendMessages],
                            }
                        ],
                    });
                    if (Object.keys(leaderboardMessages).length === 0) {
                        delete leaderboardMessages
                    }
                } catch (error) {
                    console.error(`"${channelName}" kanalı oluşturulurken bir hata oluştu:`, error);
                    const guildOwnerID = await guild.fetchOwner();
                    const Patron = await guild.getUser(guildOwnerID)
                    if (Patron) {
                        Patron.send(`Kanal oluşturma iznim olmadığı için \`LeaderBoard\` kanalını **oluşturamıyorum**.`);
                    }
                }
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            channel = guild.channels.cache.find(x => x.name === channelName);
            if (!channel) {
                return console.log('LeaderBoard Kanal bulunamadı.');
            }
            fetchedMessages = await channel.messages.fetch();

            if (fetchedMessages.size > 2 || fetchedMessages.size < 2) {
                if (Object.keys(leaderboardMessages).length > 0) {
                    delete leaderboardMessages

                }
            }
            if (Object.keys(leaderboardMessages).length === 0) {
                for (const message of fetchedMessages.values()) {
                    try {
                        await message.delete();
                    } catch (error) {
                        console.error(`Mesajı silerken hata oluştu: ${error}`);
                    }
                }
                LeaderBoard = await channel.send({
                    content: `Yeni bir ses sıralama mesajı oluşturuluyor..`,
                    embeds: [] // Boş bir embed başlangıçta
                });
                LeaderBoardiki = await channel.send({
                    content: `Yeni bir sıralama mesajı oluşturuluyor..`,
                    embeds: [] // Boş bir embed başlangıçta
                });

                leaderboardMessages = {
                    LeaderBoard: LeaderBoard.id,
                    LeaderBoardiki: LeaderBoardiki.id
                };
            }

            // LeaderBoard ve LeaderBoardiki mesajlarını düzenleme
            LeaderBoardMessage = await channel.messages.fetch(leaderboardMessages?.LeaderBoard);
            LeaderBoardikiMessage = await channel.messages.fetch(leaderboardMessages?.LeaderBoardiki);

            if (!LeaderBoardMessage || !LeaderBoardikiMessage) {
                delete leaderboardMessages
                for (const message of fetchedMessages.values()) {
                    try {
                        await message.delete();
                    } catch (error) {
                        console.error(`Mesajı silerken hata oluştu: ${error}`);
                    }
                }
                LeaderBoard = await channel.send({
                    content: `Yeni bir ses sıralama mesajı oluşturuluyor..`,
                    embeds: [] // Boş bir embed başlangıçta
                });
                LeaderBoardiki = await channel.send({
                    content: `Yeni bir sıralama mesajı oluşturuluyor..`,
                    embeds: [] // Boş bir embed başlangıçta
                });

                leaderboardMessages = {
                    LeaderBoard: LeaderBoard.id,
                    LeaderBoardiki: LeaderBoardiki.id
                };

                LeaderBoardMessage = await channel.messages.fetch(leaderboardMessages?.LeaderBoard);
                LeaderBoardikiMessage = await channel.messages.fetch(leaderboardMessages?.LeaderBoardiki);
            }

            const topVoice = await GetTop.TopUsersData(guild.id, 30, "Voice", "Total");
            const topMesaj = await GetTop.TopUsersData(guild.id, 30, "Message", "Total");
            let messageContent = '';
            let messageContent2 = '';
            let indes = 0;
            let indes2 = 0;
            if (topVoice.length > 0) {
                for (const user of topVoice) {
                    if (TimeManager.Format(user.totalValue) !== '0 saniye') {
                        messageContent += `\` ${indes + 1} \` <@${user.userID}> \`${TimeManager.Format(user.totalValue, 'Ladder')}\`\n`;
                        indes++
                    }

                };
            } else {
                messageContent = '**Veri bulunamadı.**\n';
            }
            if (topMesaj.length > 0) {
                topMesaj.forEach(async (user) => {

                    if (user.totalValue > 0) {
                        messageContent2 += `\` ${indes2 + 1} \` <@${user.userID}>  \`${user.totalValue} Mesaj\`\n`;
                        indes2++
                    }

                });
            } else {
                messageContent2 = '**Veri bulunamadı.**\n';
            }
            let MessageEdit = new EmbedBuilder()
            MessageEdit.setColor("Random")
            MessageEdit.setAuthor({ name: guild.name, iconURL: guild.iconURL({ extension: 'png' }) })
            await LeaderBoardMessage.edit({
                content: null,
                embeds: [MessageEdit.setDescription(`Aşağıda **${guild.name}** sunucusuna ait haftalık genel ses sıralaması listelenmektedir.\n\n${messageContent}\nBu sıralama <t:${Math.floor(Date.now() / 1000)}:R> düzenlendi.`)]
            })
            await LeaderBoardikiMessage.edit({
                content: null,
                embeds: [MessageEdit.setDescription(`Aşağıda **${guild.name}** sunucusuna ait haftalık genel mesaj sıralaması listelenmektedir.\n\n${messageContent2}\nBu sıralama <t:${Math.floor(Date.now() / 1000)}:R> düzenlendi.`)]
            })
        } catch (error) {
            console.log(error)
            console.error(`${guild.name} : Sunucunda LeaderBoard Kanalında Botun Listelendirdiği Mesajı Silindi.`);
        }
    }

};
module.exports.config = {
    Event: Events.ClientReady,
    System: true,
};
