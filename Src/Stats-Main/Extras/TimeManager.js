class TimeManager{
    static Format(milliseconds,Type) {
        if (typeof milliseconds !== "number" && milliseconds !== undefined) {
            console.log("Geçersiz Parametre - süreçevir(): Parametre pozitif bir sayı olmalıdır.");
            return undefined;
        }
        try {
            const totalSeconds = Math.floor(milliseconds / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            switch (Type) {
                case "Ladder":
                    return hours === 0
                    ? minutes === 0
                        ? `${seconds} saniye`
                        : `${minutes} dakika ${seconds} sn`
                    : `${hours} saat ${minutes} dk`;
                case "Top":
                    return hours === 0
                    ? minutes === 0
                        ? `${seconds} saniye`
                        : `${minutes} dk ${seconds} sn`
                    : `${hours} sa ${minutes} dk`;
                default:
                    return hours === 0
                    ? minutes === 0
                        ? `${seconds} saniye`
                        : `${minutes} dk ${seconds} sn`
                    : `${hours} sa ${minutes} dk ${seconds} sn`;
            }            
        } catch (error) {
            console.error("Zaman dönüşümü sırasında bir hata oluştu:", error);
            return undefined;
        }
    }
    static ChartFormat(milliseconds) {
        if (typeof milliseconds !== "number" && !milliseconds) {
            console.log("Geçersiz Parametre - ChartFormat(): Parametre pozitif bir sayı olmalıdır.");
            return undefined;
        }
        try {
            const totalSeconds = Math.floor(milliseconds / 1000);
            const hours = Math.floor(totalSeconds / 3600);
    
            return hours;
        } catch (error) {
            console.error("Zaman dönüşümü sırasında bir hata oluştu:", error);
            return undefined;
        }
    } 
}
module.exports = { TimeManager }