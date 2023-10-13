const { JoinedChannel } = require("../../../Providers/Database/Models/General");

class Duration{
    static async DurationGet(guildID, userID, type) {
        if (!guildID || !userID || !type) {
            console.log("Eksik veya geçersiz parametre. - DurationGet()");
        }
        try {
            const joinData = await JoinedChannel.findOne({guildID:guildID,userID:userID });
    
            if (!joinData || !joinData[type]) {
                return undefined;
            }
    
            const joinedAtTimestamp = joinData[type];
            const currentTimeStamp = Date.now();
    
            if (isNaN(joinedAtTimestamp) || isNaN(currentTimeStamp)) {
                console.log("Tarih bilgisi geçersiz.");
            }
    
            const difference = currentTimeStamp - joinedAtTimestamp;
            return difference;
        } catch (error) {
            console.error("Zaman süresi alınırken bir hata oluştu:", error.message);
            return undefined;
        }
    }
}

module.exports = { Duration }
