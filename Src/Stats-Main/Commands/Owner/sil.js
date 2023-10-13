const {EmbedBuilder,PermissionsBitField: { Flags }} = require('discord.js');

module.exports = {
    Isim: "sil",
    Komut: ["sil"],
    Kullanim: "",
    Kategori: "",
    Aciklama: "",
    Active: true,
    Cooldown: 5000,
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
    if (!message.member.permissions.has(Flags.Administrator)) {
      const embed = new EmbedBuilder()
      .setDescription(`${message.guild.emojiGöster(emojiler.Iptal)} **Bu Komutu Kullanmak için Yeterli Yetkiye Sahip Değilsiniz.**`)
      .setAuthor({name: message.member.user.username, iconURL: message.guild.iconURL()})
      .setColor("Red");
      return message.channel.wsend({embeds:[embed]}).sil(8);
  }
    if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) {
        return message.channel
          .wsend("Hata: 1-100 arasında silinecek mesaj miktarı belirtmelisin!")
          .then((errorMessage) => {
            setTimeout(() => {
              errorMessage.delete();
            }, 5000); // 10000 milisaniye (10 saniye) sonra mesajı siler
          });
      }
      const amount = Number(args[0]);
      try {
        const fetchedMessages = await message.channel.messages.fetch({ limit: amount + 1 });
        const messagesToDelete = fetchedMessages.filter((msg) => !msg.pinned); // Sabitlenmiş mesajları filtrele
        const deleteCount = messagesToDelete.size;
        if (deleteCount === 1) {
          return message.channel
            .wsend("Kanalda silinecek mesaj bulunamadı!")
            .then((errorMessage) => {
              setTimeout(() => {
                errorMessage.delete();
              }, 5000); // 10000 milisaniye (10 saniye) sonra mesajı siler
            });
        }
        message.channel
          .bulkDelete(messagesToDelete)
          .then((deletedMessages) => {
            message.channel
              .wsend(
                `${message.guild.emojiGöster(emojiler.Onay)} Başarıyla <#${message.channel.id}> - (\`${message.channel.id}\`) adlı kanalda (**${deletedMessages.size - 1}**) adet mesaj **silindi!**`
              ).sil(8)
          });
      }catch (error) {
        console.log(
          '\x1b[31m%s\x1b[0m',
          "[HATA] Mesajları getirirken bir hata oluştu:",
          error
        );
    }
  }
};


