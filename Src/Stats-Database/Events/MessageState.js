const { Events, ChannelType } = require("discord.js");
const { MysDataBase } = require('../Helpers/Services/StatSave');

module.exports = async (message) => {
    try {
        if (message.author.bot || !message.guild) return; // Bot veya özel mesajları yok say
        const hasOwo = message.channel.name && message.channel.name.includes('owo');
        const isDM = message.channel.type === ChannelType.DM;

        // Özel koşulları burada ekleyebilirsiniz
        if (hasOwo || isDM) return;

        let Prefix = System.MainFrame.Prefix.find((x) => message.content.toLowerCase().startsWith(x));

        // Prefix kontrolü burada yapılabilir
        if (Prefix) return;

        // Mesaj istatistiklerini kaydet
        await MysDataBase.UserMessageStatsSave(message.guild.id, message.author.id, message.channel.id);

    } catch (error) {
        console.error("Bir hata oluştu: ", error);
    }
};

module.exports.config = {
    Event: Events.MessageCreate,
    System: true,
};
