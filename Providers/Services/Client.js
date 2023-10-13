const { Events,ChannelType,ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
class ClientServices{
    static sistemGereksinimleri() {
        
        global.System = require('../Settings/Systems');
        
        //global.emojiler = require('../../../../Providers/Settings/Emoji.json');
    }
    static BotVoiceJoin(){
        client.on(Events.ClientReady, async () => {
            setInterval(async () => {
                const Server = client.guilds.cache.get(System.ServerID);
                if(!Server) return;
                const voiceChannel = Server.channels.cache.find(channel => channel.type === ChannelType.GuildVoice && channel.id === System.BotVoiceChannel);
                if (voiceChannel && voiceChannel.guild) {
                    try {
                        joinVoiceChannel({
                            channelId: voiceChannel.id,
                            guildId: voiceChannel.guild.id,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                            selfDeaf: true,
                        });
                    } catch (error) {
                        console.error('Ses bağlantısı oluşturulurken bir hata oluştu:', error);
                    }
                } else {
                    console.log('Geçersiz ses kanalı.');
                }
            }, 30000); // 30 saniye (30.000 milisaniye)
          });
    }
    static Activity(){
        client.on(Events.ClientReady, async () => {
            const getType = (type) => {
                switch (type) {
                case 'COMPETING':
                    return ActivityType.Competing;
            
                case 'LISTENING':
                    return ActivityType.Listening;
            
                case 'PLAYING':
                    return ActivityType.Playing;
            
                case 'WATCHING':
                    return ActivityType.Watching;
            
                case 'STREAMING':
                    return ActivityType.Streaming;
                default:
                    return ActivityType.Custom;
                }
            };
            setInterval(async () => {
                const liste = System.Aktivites;
                const listes = ['PLAYING', 'WATCHING', 'LISTENING', 'STREAMING', 'COMPETING'];
                const stats = ['dnd', 'idle', 'online','idle','dnd','dnd','dnd','online','idle'];
                const statsrndm = Math.floor(Math.random() * stats.length);
                const random = Math.floor(Math.random() * liste.length);
                const rndm = Math.floor(Math.random() * listes.length);
            
                const statusOptions = {
                status: stats[statsrndm],
                activities: [
                    {
                    name: liste[random],
                    type: getType(listes[rndm]),
                    },
                ],
                };
                client.user.setPresence(statusOptions)
            }, 60000);
        })
    }
}
module.exports = { ClientServices: ClientServices }