const { Duration } = require('../VoiceTime')
const { MysDataBase } = require('./StatSave')
class Task{
    static async Save(State,Type){
        if (!Array.isArray(Type) || Type.length === 0) {
            console.log("Type parametresi bir dizi olmalı ve boş olmamalıdır.");
        }

        const PublicOdalar = System.PublicRoomsCategory; // Kategori ID'sini buraya yazın
        const GameRoomsCategory = System.GameRoomsCategory;
        const RegisterKanalları = System.RegisteryRoomsCategory;
        const ÖzelOdalar = System.OzelOda;
        const AfkKanalı = System.AfkRoomsId;
        const EtkinlikId = System.EtkinlikChannelId;
        const SunucuIsi = System.SunucuIsiChannelId;
        const DCCategory = System.DCCategory;
        const VKCategory = System.VKCategory;
        const SorunCozmeCategory = System.SorunCozmeCategory;
        const Streamer = System.StreamerCategory;
        const YetkiliAlim = System.YetkilialimCategory;

        const channelId = State?.channel?.id;
        const parentId = State?.channel?.parentId;
        const parentName = State?.channel?.parent?.name?.toLowerCase();

        if (!channelId && !parentId && !parentName) {
            return console.log("Eksik veya geçersiz parametreler. - DbSave()")
        }
        else if (SunucuIsi.includes(channelId)) {
            await this.saveAndUpdateStats(State, 'SunucuWork', channelId,Type)
        }
        else if (EtkinlikId.includes(channelId)) {
            await this.saveAndUpdateStats(State, 'Etkinlik', channelId,Type)
        } 
        else if (AfkKanalı.includes(channelId)) {
            await this.saveAndUpdateStats(State, 'Afk', channelId, Type)
        }
        else if (RegisterKanalları.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'Register', channelId, Type)
        }
        else if (PublicOdalar.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'Public', channelId, Type)
        } 
        else if (Streamer.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'Streamer', channelId,Type)
        }
        else if (YetkiliAlim.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'YetkiliAlim', channelId,Type)
        }  
        else if (DCCategory.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'DC', channelId,Type)
        } 
        else if (VKCategory.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'VK', channelId,Type)
        } 
        else if (SorunCozmeCategory.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'SorunCozme', channelId,Type)
        } 
        else if (ÖzelOdalar.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'Özel', channelId, Type)
        } 
        else if (GameRoomsCategory.includes(parentId)) {
            await this.saveAndUpdateStats(State, 'Oyun', channelId,Type)
        } 
        else {
            await this.saveAndUpdateStats(State, 'Diğer', channelId, Type)
        }

    }
    static async saveAndUpdateStats(State, category, channelId, types) {
        if (!State || !category || !channelId || !Array.isArray(types) || types.length === 0) {
            throw new Error("Eksik veya geçersiz parametreler. - saveAndUpdateStats()");
        }
    
        const newTotalDurations = {};
        for (const type of types) {
            if (typeof type !== "string") {
                console.log("Geçersiz parametre - saveAndUpdateStats()");
                return
            }
            
            const newTotalDuration = Duration.DurationGet(State?.guild.id, State?.member.id, type);
            if (newTotalDuration === undefined) {
                console.log("Giriş yaptığı zaman yok - saveAndUpdateStats()");
                return
            }
            newTotalDurations[type] = {
                TotalDuration: newTotalDuration,
                DailyDuration: newTotalDuration,
                WeeklyDuration: newTotalDuration,
            };
        }
    
        const updatePromises = [];
    
        for (const type of types) {
            const GetStat = newTotalDurations[type];
            // Güncelenecek tüm verileri dizi içine toplayalım.
            updatePromises.push(
                MysDataBase.UserSeensSave(State?.guild?.id, State?.member?.id, GetStat, channelId, type),
                MysDataBase.DB_SAVE(State?.guild?.id, State?.member?.id, GetStat, channelId, type, category)
            )
        }
        // Tüm güncellemelerin tamamlanmasını bekleyelim.
        await Promise.all(updatePromises);
    }
}
module.exports = { Task }