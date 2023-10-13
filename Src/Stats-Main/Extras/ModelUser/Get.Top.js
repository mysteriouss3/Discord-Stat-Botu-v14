const { GeneralUserStats } = require("../../../../Providers/Database/Models/General");
class GetTop{
    static async TopUsersData(guildID, SliceNumber, dataType, Period) {
        if (!guildID || !SliceNumber || !dataType || !Period) {
          console.error("Eksik veya geçersiz parametreler.");
          return [];
        }
      
        try {
          const sortField = `all${dataType}.${dataType === 'Message' ? `MessageData.${Period}Message` : dataType === 'Voice' ? `User.${Period}Duration` : `${Period}Duration`}`;
      
          const aggregationPipeline = [
            {
              $match: { guildID: guildID }
            },
            {
              $sort: { [sortField]: -1 }
            },
            {
              $limit: SliceNumber
            },
            {
              $project: {
                userID: 1,
                totalValue: {
                  $ifNull: [`$${sortField}`, 0]
                }
              }
            }
          ];
      
          const result = await GeneralUserStats.aggregate(aggregationPipeline).exec();
      
          if (!result || result.length === 0) {
            return [];
          }
          
          const topUsers = result.map((document) => {
            return {
              userID: document.userID,
              totalValue: document.totalValue || 0
            };
          });
      
          return topUsers;
        } catch (error) {
          console.error("Veritabanı işlemi hatası: " + error.message);
          return [];
        }
    }
    static async CategoryTopUsersData(guildID, SliceNumber, category, Period) {
        if (!guildID || !SliceNumber || !category || !Period) {
          console.error("Eksik veya geçersiz parametreler. - CategoryTopUserData();");
          return [];
        }
      
        try {
          const sortField = `allVoice.User.CategoryStat.${category}.${Period}Duration`;
      
          const aggregationPipeline = [
            {
              $match: { guildID: guildID }
            },
            {
              $sort: { [sortField]: -1 }
            },
            {
              $limit: SliceNumber
            },
            {
              $project: {
                userID: 1,
                totalValue: {
                  $ifNull: [
                    `$allVoice.User.CategoryStat.${category}.${Period}Duration`,
                    0
                  ]
                }
              }
            }
          ];
      
          const result = await GeneralUserStats.aggregate(aggregationPipeline).exec();
      
          if (!result || result.length === 0) {
            return [];
          }
      
          const topUsers = result.map((document) => {
            return {
              userID: document.userID,
              totalValue: document.totalValue || 0
            };
          });
      
          return topUsers;
        } catch (error) {
          console.error("Veritabanı işlemi hatası: " + error.message);
          return [];
        }
      }
      
}
module.exports = { GetTop }