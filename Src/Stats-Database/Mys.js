const { Client, GatewayIntentBits, Partials} = require("discord.js")

const client = global.client = new Client({
    fetchAllMembers:true,
    intents:Object.keys(GatewayIntentBits),
    partials:Object.keys(Partials)
})

const DB = require('../../Providers/Database/MongoDriver')

const { Main } = require('../../Providers/Services/Main')

const { ClientServices } = require('../../Providers/Services/Client')

DB.Connect()

ClientServices.sistemGereksinimleri()


client.login(System.MainFrame.TokenDataBase).then(() =>console.log(`🟢 ${client.user.username} Başarıyla Giriş Yaptı!`))
.catch((err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${err}`))



ClientServices.BotVoiceJoin()
ClientServices.Activity()

Main.KomutYükle()
Main.EventYükle()

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});