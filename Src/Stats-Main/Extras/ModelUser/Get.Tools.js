const { GeneralUserStats } = require("../../../../Providers/Database/Models/General");

class GetTools {
    /**
     * - Kullanıcının Kaç günlük verisi olduğunu gün olarak döndüren asenkron bir işlev.
     * - userID ve guildID girilmesi zorunludur yoksa undefined dönecektir.
     *
     * @param {string} guildID
     * @param {string} userID 
     * @returns {Promise<number|undefined>} - Kullanıcının verilerine göre kaç gün önce verisi olduğu. Eğer kullanıcının verileri bulunamazsa, undefined döner.
     * @throws {Error} - Eksik veya geçersiz parametreler olduğunda hata fırlatır.
     */
    static async GetDataAge(guildID, userID) {
        if (!userID || !guildID) {
            console.log("Eksik veya geçersiz parametreler. - FirstDayGet()");
            return;
        }
        try {
          const userData = await GeneralUserStats.findOne({ guildID: guildID, userID: userID }).sort({ "date": 1 });

        if (userData && userData.date) {
          const firstDate = userData.date; // İlk veri tarihi
          const today = new Date(); // Şu anki tarih
          const timeDifferenceMs = today - firstDate;
          const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
          const hoursDifference = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutesDifference = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));

          let result = "";

          if (daysDifference > 0) {
            result = daysDifference + " günlük";
            return result;
          }

          if (hoursDifference > 0) {
            result = hoursDifference + " saatlik";
            return result;
          }

          if (minutesDifference > 0) {

            result = minutesDifference + " dakikalık";
            return result;
          }

          if (result === "") {
            result = "60 Saniyelik";
          }

          return result;
        }

          
        } catch (error) {
          console.error("Veritabanı işlemi hatası: " + error.message);
        }
          
    }
}
module.exports = { GetTools }