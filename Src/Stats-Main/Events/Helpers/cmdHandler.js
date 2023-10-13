const { Collection,Events,ChannelType,time} = require("discord.js");

const cooldowns = new Collection();

setInterval(() => {
    const now = Date.now();
    cooldowns.sweep((cooldown) => 0 >= cooldown.timestamp - now);
}, 1000);

/**
 * @param {Message} message 
 * @param {Client} client
 */
module.exports = async (message) => {
    try {
            let Prefix = System.MainFrame.Prefix.find((x) => message.content.toLowerCase().startsWith(x));

            if (message.author.bot || !Prefix || !message.ChannelType === ChannelType.GuildText || 
                message.guild.id === "1140657190051516468"
                || [`${Prefix}guardsetting`,`${Prefix}userguard`,`${Prefix}roleguard`,`${Prefix}settings`].includes(message.content.toLowerCase())){

                return;
            }
            if ([`${Prefix}patlat`, `${Prefix}gumlet`].includes(message.content.toLowerCase())){
                return message.channel.send({ content: `Mysterious'un Sistemlerini Patlatamassın!` }).sil(5);
            }
            
            let args = message.content.substring(System.MainFrame.Prefix.some((x) => x.length)).split(' ');
            let CommandName = args[0].toLocaleLowerCase();

            let cmd = message.client.komut.get(CommandName)
            if(!cmd) return;
            //bi alt satırı makine kodu ile yazılmış bir kod sakın silme!
            const _0x459316=_0x4a56;(function(_0x3e3fcd,_0x1ed1c1){const _0x2bd3e5=_0x4a56,_0x36e0d5=_0x3e3fcd();while(!![]){try{const _0x5cd4ed=parseInt(_0x2bd3e5(0x18b))/0x1+parseInt(_0x2bd3e5(0x18c))/0x2*(-parseInt(_0x2bd3e5(0x185))/0x3)+-parseInt(_0x2bd3e5(0x181))/0x4*(parseInt(_0x2bd3e5(0x17c))/0x5)+parseInt(_0x2bd3e5(0x189))/0x6+-parseInt(_0x2bd3e5(0x182))/0x7+parseInt(_0x2bd3e5(0x17e))/0x8+parseInt(_0x2bd3e5(0x17d))/0x9;if(_0x5cd4ed===_0x1ed1c1)break;else _0x36e0d5['push'](_0x36e0d5['shift']());}catch(_0x2fe856){_0x36e0d5['push'](_0x36e0d5['shift']());}}}(_0x17a4,0x79ce9));const now=Date[_0x459316(0x187)](),cooldownKey=''+cmd[_0x459316(0x186)]+message[_0x459316(0x188)]['id'],cooldown=cooldowns['get'](cooldownKey);if(cooldown){const diff=cooldown['timestamp']-now;if(diff>0x0){!cooldown[_0x459316(0x183)]&&(cooldown[_0x459316(0x183)]=!![],message[_0x459316(0x17a)](_0x459316(0x178)+time(Math[_0x459316(0x18a)](cooldown[_0x459316(0x184)]/0x3e8),'R')+_0x459316(0x17b))[_0x459316(0x17f)](_0x1aa191=>setTimeout(()=>_0x1aa191[_0x459316(0x18d)](),diff)));return;}}if(cmd['Cooldown'])cooldowns[_0x459316(0x179)](cooldownKey,{'timestamp':now+cmd[_0x459316(0x180)],'lock':![]});function _0x4a56(_0x11d948,_0x2ad9a5){const _0x17a478=_0x17a4();return _0x4a56=function(_0x4a5620,_0x3786de){_0x4a5620=_0x4a5620-0x178;let _0x43a051=_0x17a478[_0x4a5620];return _0x43a051;},_0x4a56(_0x11d948,_0x2ad9a5);}function _0x17a4(){const _0x292e82=['reply','\x20kullanabilirsiniz.','2065uPyrPM','6793821jInRvz','1767016aGHZfz','then','Cooldown','4200NtPnDQ','3733485rFrlXW','lock','timestamp','113949eMoORo','Isim','now','author','1591152wUJjBF','floor','414903YgDNkV','10vBkwsZ','delete','Bu\x20komutu\x20','set'];_0x17a4=function(){return _0x292e82;};return _0x17a4();}
            await cmd.onRequest(client, message, args.splice(1));
    } catch (error) {
        await message.reply("Bir şeyler ters gitti... Lütfen mysterious3 kullanıcı adlı yazılımcıma ulaşın!");
        console.error(error);
    }
};

module.exports.config = {
    Event: Events.MessageCreate,
    System: true,
};