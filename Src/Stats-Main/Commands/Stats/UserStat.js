const { EmbedBuilder } = require('discord.js')
const { GetUser } = require('../../Extras/ModelUser/Get.User')
const { GetAll } = require('../../Extras/ModelUser/Get.All')
const { GetLeaders } = require('../../Extras/ModelGuild/Get.Leaders')
const { GetTools } = require('../../Extras/ModelUser/Get.Tools')
const { TimeManager } = require('../../Extras/TimeManager')


module.exports = {
  Isim: "stat",
  Komut: ["stat", "me"],
  Kullanim: ".stat",
  Kategori: "stat",
  Aciklama: "istatistigini gösterir.",
  Active: true,
  Cooldown: 3500,
  Config: {
    Permissions: [],
    Mode: false
  },

  /**
  * @param {Client} client 
  */
  onLoad: function (client) {

  },

  /**
  * @param {Client} client 
  * @param {Message} message 
  * @param {Array<String>} args 
  */

  onRequest: async function (client, message,args) {
    const startTime = Date.now();
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const member = message.guild.members.cache.get(target.id);

    const msj = await message.reply({ content: `🔍 | **${member.user.username}** kullanıcısının verileri yükleniyor. Lütfen bekleyin!` });


    async function fetchUserData(memberId) {
      const dataPromises = [
        GetUser.Data(message.guild.id, memberId),
        GetUser.UserVoiceTopChannelWeekly(message.guild.id, memberId, 5), // Top Kaç Kanal Çekilmesini Istiyorsanız Onu Yazın
        GetUser.UserMesajTopChannelWeekly(message.guild.id, memberId, 5),
        GetLeaders.getAllLeadership(message.guild.id, memberId),
        GetAll.AllCategoriesDataGet(message.guild.id, memberId),
        GetTools.GetDataAge(message.guild.id, memberId),
      ];
      const [
        User,
        UserVoice,
        UserMessage,
        UserLadder,
        UserParents,
        GetDataAge,
    ] = await Promise.all(dataPromises);
    
    const userData = {
        User,
        UserVoice,
        UserMessage,
        UserLadder,
        UserParents,
        GetDataAge,
    };
    return userData;
    }

    const userData = await fetchUserData(member.id);
    const User = userData.User;
    const UserVoiceChannel = userData.UserVoice;
    const UserMessageChannel = userData.UserMessage;
    const Leaders = userData.UserLadder;
    const UserAllParents = userData.UserParents;
    const DateAge = userData.GetDataAge;
    const highestRole = member.roles.highest;

      const embed = new EmbedBuilder()
      .setColor(highestRole.color)
      .setTitle("Kullanıcı Verileri")
      .setURL("https://github.com/mysteriouss3")
      .setDescription(`📊 | ${member}  (${highestRole})  Kullanıcısı'nın \`${message.guild.name}\` Sunucusunda \`${DateAge ?? ''}\`  Detaylı Istatistik Bilgileri Aşağida Belirtilmiştir.`)
      .addFields(
        /*
{name: `${message.guild.eGet(emojiler.Kupa)} __**Rozet Durumunuz**__`,value: `
\`•\` Bir sonraki <@&${nextReward.role}> rozetini elde etmek için ses kanallarda \`${nextReward.kalanSüre}\` geçirmen gerekiyor.
\`•\` Bir sonraki <@&${nextReward2.role}> rozetini elde etmek için mesaj kanallarına \`${nextReward2.kalanSüre}\` mesaj yazman gerekiyor.
`,inline: false},*/


{name: `💎 __**Genel Sıralamaları**__`,value:`
\`•\` Ses Sıralaması : **\`${Leaders.Voice ?? 0}.\`**
\`•\` Mesaj Sıralaması :**\`${Leaders.Message ?? 0}.\`**
\`•\` Yayın Sıralaması : **\`${Leaders.Streamer ?? 0}.\`**
\`•\` Ses Sıralaması : **\`${Leaders.Camera ?? 0}.\`**
`,inline: false},

{ name: `🔊 __**Ses Bilgisi**__`,value:`
Toplam   : **\`${TimeManager.Format(User.Ses.Total ?? 0,"Top")}\`**
Günlük   : **\`${TimeManager.Format(User.Ses.Günlük ?? 0,"Top")}\`**
Haftalık : **\`${TimeManager.Format(User.Ses.Haftalık ?? 0,"Top")}\`**
`,inline: true},
{ name: `📃 __**Mesaj Bilgisi**__`,value:`
Toplam   : **\`${User.Mesaj.Total ?? 0} mesaj\`**
Günlük   : **\`${User.Mesaj.Günlük ?? 0} mesaj\`**
Haftalık : **\`${User.Mesaj.Haftalık ?? 0} mesaj\`**
`,inline: true},

{ name: '\u200B', value: '\u200B', inline: true  }, 

{ name: `📸 __**Kamera Bilgisi**__`,value:`
Toplam   : **\`${TimeManager.Format(User.Camera.Total ?? 0,"Top")}\`**
Günlük   : **\`${TimeManager.Format(User.Camera.Total ?? 0,"Top")}\`**
Haftalık : **\`${TimeManager.Format(User.Camera.Total ?? 0,"Top")}\`**
`,inline: true},
{ name: `🎥 __**Yayın Bilgisi**__`,value:`
Toplam   : **\`${TimeManager.Format(User.Streamer.Total ?? 0,"Top")}\`**
Günlük   : **\`${TimeManager.Format(User.Streamer.Total ?? 0,"Top")}\`**
Haftalık : **\`${TimeManager.Format(User.Streamer.Total ?? 0,"Top")}\`**
`,inline: true},

{ name: '\u200B', value: '\u200B', inline: true  }, 

{ name: `🔊 __**Kategorilendirilmiş Total Ses Istatistikleri**__`,value:`
\`•\` Register Odalar   : **\`${TimeManager.Format(UserAllParents.Register.Haftalık ?? 0)}\`**
\`•\` Public Odalar     : **\`${TimeManager.Format(UserAllParents.Public.Haftalık ?? 0)}\`**
\`•\` Sorun Cözme Odalar : **\`${TimeManager.Format(UserAllParents.SorunCozme.Haftalık ?? 0)}\`**
\`•\` Streamer Odalar   : **\`${TimeManager.Format(UserAllParents.Streamer.Haftalık ?? 0)}\`**
\`•\` Etkinlik Odalar   : **\`${TimeManager.Format(UserAllParents.Etkinlik.Haftalık ?? 0)}\`**
\`•\` DC Odalar         : **\`${TimeManager.Format(UserAllParents.DC.Haftalık ?? 0)}\`**
\`•\` VK Odalar         : **\`${TimeManager.Format(UserAllParents.VK.Haftalık ?? 0)}\`**
\`•\` Oyun Odalar       : **\`${TimeManager.Format(UserAllParents.Oyun.Haftalık ?? 0)}\`**
\`•\` Özel Odalar       : **\`${TimeManager.Format(UserAllParents.Özel.Haftalık ?? 0)}\`**
\`•\` Uyku Odalar       : **\`${TimeManager.Format(UserAllParents.Afk.Haftalık ?? 0)}\`**
\`•\` Sunucu İşleri Odalar : **\`${TimeManager.Format(UserAllParents.SunucuWork.Haftalık ?? 0)}\`**
\`•\` Diğer Odalar      : **\`${TimeManager.Format(UserAllParents.Diğer.Haftalık ?? 0)}\`**`, inline: false },

{name: `🎤 __**Kanal Sıralaması (${User.Ses.Haftalık ? UserVoiceChannel.totalChannelCount + " kanalda bulunmuş" : "Veri Yok"})**__` , value: `${User.Ses.Haftalık ? UserVoiceChannel.TopChannel : `\`•\` **Veriniz Yok**`}`,inline: false},
{name: `✉️ __**Mesaj Sıralaması (Haftalık: ${User.Mesaj.Haftalık ?? "Veri Yok"})**__`, value: `${User.Mesaj.Haftalık ? UserMessageChannel : `\`•\` **Veriniz Yok**`}`,inline: false},

)
      .setThumbnail(message.guild.iconURL({  size: 2048 , extension: 'png' }) ?? target.displayAvatarURL({ size: 128, extension: 'png' }))
      .setFooter({text:"Bot Developed By mysterious3",iconURL:message.guild.iconURL()})
      msj.edit({content: ``,embeds: [embed] }).then(() => {
          const endTime = Date.now();
          const reactionTime = endTime - startTime;
          message.channel.send(`Tepki süresi: ${reactionTime} ms`).sil(3);
      });
  }
};