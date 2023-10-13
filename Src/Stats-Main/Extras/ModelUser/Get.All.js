const { GeneralUserStats,Seens } = require("../../../../Providers/Database/Models/General");
const { TimeManager } = require("../../Extras/TimeManager");
class GetAll{
    static async AllCategoriesDataGet(guildID, userID) {
        const categoryArray = ["SunucuWork", "Etkinlik", "Afk", "Register", "Public", "Streamer", "YetkiliAlim", "DC", "VK", "SorunCozme", "Özel", "Oyun", "Diğer"];
        const allCategoriesData = {};
      
        for (const category of categoryArray) {
          allCategoriesData[category] = {
            Total: 0,
            Günlük: 0,
            Haftalık: 0,
            Aylık: 0,
          };
        }
      
        if (!guildID || !userID) {
          console.log('Eksik veya geçersiz parametreler. - AllCategoriesDataGet');
          return allCategoriesData;
        }
        try {
          const aggregationPipeline = [
            {
              $match: { guildID: guildID, userID: userID }
            },
            {
              $project: {
                _id: 0,
                allVoice: 1
              }
            }
          ];
      
          const userData = await GeneralUserStats.aggregate(aggregationPipeline).exec();

          if (userData.length > 0) {
            const userVoiceData = userData[0].allVoice?.User;
      
            if (userVoiceData) {
              for (const category of categoryArray) {
                const categoryStat = userVoiceData.CategoryStat?.[category];
      
                if (categoryStat) {
                  allCategoriesData[category] = {
                    Total: categoryStat.TotalDuration ?? 0,
                    Günlük: categoryStat.DailyDuration ?? 0,
                    Haftalık: categoryStat.WeeklyDuration ?? 0,
                    Aylık: categoryStat.MonthlyDuration ?? 0
                  };
                }
              }
            }
          }
      
          return allCategoriesData;
        } catch (error) {
          console.log("Veritabanı işlem hatası: " + error.message);
          return allCategoriesData;
        }
      }
      
     
    static async SeensAll(guildID, userID) {
        if (!userID || !guildID) {
            console.log("Eksik veya geçersiz parametreler. - SeensAll()");
            return undefined;
        }
        const types = ["Messages", "Voices", "Streamers", "Camera"];
        try {
            const LastSeen = await Seens.aggregate([
                {
                    $match: { guildID: guildID, userID: userID }
                }
            ]);
            const result = {};
            const SeenChannel = {};
            const SeenDuration = {};
            if (!LastSeen || LastSeen.length === 0) {
                console.log("Veritabanında veri bulunamadı.");
                return {
                    result: undefined
                };
            }
            types.forEach(type => {
                const entry = LastSeen[0][type][Object.keys(LastSeen[0][type])[0]];
                if (entry && Object.keys(entry).length > 0) {
                    const channelID = Object.keys(LastSeen[0][type])[0];
                    const isMessageSeens = (type === "Messages");
                    const totalChannelDuration = isMessageSeens ? TimeManager.Format(Date.now() - entry.Date ?? 0,"Top") : TimeManager.Format(entry.Duration ?? 0,"Top");
                    const resultText = `<#${channelID}> : \`${totalChannelDuration} ${isMessageSeens ? "önce" : "kaldı"}\``;
                    result[type] = resultText;
                    SeenChannel[type] = `<#${channelID}>`
                    SeenDuration[type] = totalChannelDuration
                }
            });
            return {result ,SeenChannel,SeenDuration};
        } catch (error) {
            console.log("SeensAll() - Veritabanı işlemi hatası: " + error.message);
            return undefined;
        }
    }
}
module.exports = { GetAll };