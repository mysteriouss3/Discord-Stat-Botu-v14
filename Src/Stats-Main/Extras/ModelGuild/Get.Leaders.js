const { GeneralUserStats } = require("../../../../Providers/Database/Models/General");
class GetLeaders{
    //#################################################### INTERFACE ################################################################
    static async getAllLeadership(guildID, userID) {
        const allLeadership = {
            Voice: undefined,
            Streamer: undefined,
            Camera: undefined,
            Message: undefined
        };
        if (!userID || !guildID) {
            console.log("Eksik veya geçersiz parametreler. - getAllLeadership()");
            return allLeadership;
        }
        try {
                const ranks = {};
                const leadershipTypes = ["Voice", "Streamer", "Camera", "Message"];
                for (const type of leadershipTypes) {
                    const sortProperty = type === "Message" ? `all${type}.MessageData.TotalMessage` : type === 'Voice' ? `all${type}.User.TotalDuration` : `all${type}.TotalDuration`;
                  
                    const aggregationPipeline = [
                    {
                        $match: { guildID: guildID }
                    },
                    {
                        $sort: { [sortProperty]: -1 }
                    },
                    {
                        $group: {
                        _id: null,
                        ranking: { $push: "$userID" }
                        }
                    }
                    ];
                    const result = await GeneralUserStats.aggregate(aggregationPipeline).exec();
                    if (result.length > 0) {
                    const ranking = result[0].ranking;
                    const userIndex = ranking.indexOf(userID);

                    if (userIndex !== -1) {
                        ranks[type] = userIndex + 1;
                    } else {
                        ranks[type] = undefined;
                    }
                    } else {
                    ranks[type] = undefined;
                    }
                }
                    return ranks;
        } catch (error) {
            if (error.message.includes("Cannot read properties of undefined")) {
                console.log(`getUserLeadership() - Özellik mevcut değil, sıralama yapılamadı.`);
            } else {
                console.log(`getUserLeadership() - Veritabanı işlemi hatası: ${error.message}`);
            }
        }
    }
    static async getUserLeadership(guildID, userID, Type) {
        if (!userID || !guildID ) {
            console.log(`Eksik veya geçersiz parametreler. - getUserLeadership()`);
            return undefined;
        }
        try {
            const ranks = {};
            const sortProperty = Type === "Message" ? `all${Type}.MessageData.TotalMessage` : Type === 'Voice' ? `all${Type}.User.TotalDuration` : `all${Type}.TotalDuration`;
                    const aggregationPipeline = [
                    {
                        $match: { guildID: guildID }
                    },
                    {
                        $sort: { [sortProperty]: -1 }
                    },
                    {
                        $group: {
                        _id: null,
                        ranking: { $push: "$userID" }
                        }
                    }
                    ];
                    const result = await GeneralUserStats.aggregate(aggregationPipeline).exec();
                    if (result.length > 0) {
                        const ranking = result[0].ranking;
                        const userIndex = ranking.indexOf(userID);
                        if (userIndex !== -1) {
                            ranks[Type] = userIndex + 1;
                        } else {
                            ranks[Type] = undefined;
                        }
                    } else {
                        ranks[Type] = undefined;
                    }
                
                    return ranks;
        } catch (error) {
            if (error.message.includes("Cannot read properties of undefined")) {
                console.log(`getUserLeadership() - Özellik mevcut değil, sıralama yapılamadı.`);
                return undefined;
            } else {
                console.log(`getUserLeadership() - Veritabanı işlemi hatası: ${error.message}`);
                return undefined;
            }
        }
    }
    static async CategoryLeadersGet(guildID, userID, category) {
        if (!userID || !guildID || !category) {
          console.log("Eksik veya geçersiz parametreler. - CategoryLeadersGet()");
          return undefined;
        }
        try {
          const aggregationPipeline = [
            {
              $match: { guildID: guildID }
            },
            {
              $sort: { [`allVoice.User.CategoryStat.${category}.TotalDuration`]: -1 }
            },
            {
              $group: {
                _id: null,
                ranking: { $push: "$userID" }
              }
            }
          ];
          const result = await GeneralUserStats.aggregate(aggregationPipeline).exec();
          if (result.length > 0) {
            const ranking = result[0].ranking;
            const relevantUserIndex = ranking.indexOf(userID);
            if (relevantUserIndex !== -1) {
              const userRank = relevantUserIndex + 1;
              return userRank;
            }
          }
          console.log(`CategoryLeadersGet(${category}) - Kullanıcı bulunamadı veya veri bulunamadı.`);
          return undefined;
        } catch (error) {
            if (error.message.includes("Cannot read properties of undefined")) {
                console.log(`CategoryLeadersGet(${category}) - Özellik mevcut değil, sıralama yapılamadı.`);
                return undefined;
            } else {
                console.log(`CategoryLeadersGet(${category}) - Veritabanı işlemi hatası: ${error.message}`);
                return undefined;
            }
        }
    }
}
module.exports = { GetLeaders }