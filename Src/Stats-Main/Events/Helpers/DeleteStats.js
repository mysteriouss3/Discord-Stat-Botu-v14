const { Events, ChannelType } = require("discord.js");
const { CronJob } = require("cron");
const { GeneralUserStats, GuildParentStats } = require("../../../../Providers/Database/Models/General");

module.exports = async (client) => {
    try {

        const daily = new CronJob("57 23 * * *", async () => {
            client.guilds.cache.forEach(async (guild) => {
                await resetUserData(guild.id, "Daily");
            });
        }, null, true, "Europe/Istanbul");
        daily.start();
        const weekly = new CronJob("55 23 * * 0", () => {
            client.guilds.cache.forEach(async (guild) => {
                await resetUserData(guild.id, "Weekly");
            });
        }, null, true, "Europe/Istanbul");
        weekly.start();

    } catch (error) {
        console.error("CronJob hatası: ", error.message);
    }
};

async function resetUserData(guildID, period) {
    const periodDataFields = {
        Daily: "DailyChannelDuration",
        Weekly: "WeeklyChannelDuration",
    };
    if (!Object.keys(periodDataFields).includes(period)) {
        console.log("Geçersiz dönem.");
        return;
    }

    const resetData = {};
    const resetMesaj = {};
    const ParentData = {};
    const parentNames = ["SunucuWork", "Etkinlik", "Afk", "Register", "Public", "Streamer", "YetkiliAlim", "DC", "VK", "SorunCozme", "Özel", "Oyun", "Diğer"];
    const resetFields = [
        { field: "Voice", category: "User" },
        { field: "Streamer" },
        { field: "Camera" },
        { field: "Message", messageType: "MessageData" }
    ];
    resetFields.forEach(({ field, category, messageType }) => {
        const fieldPrefix = `all${field}.${category ? category + "." : ""}`;
        resetData[`${fieldPrefix}${period}Duration`] = 0;
        if (messageType) {
            resetMesaj[`${fieldPrefix}${messageType}.${period}Message`] = 0;
        }
    });
    parentNames.forEach(parentName => {
        ParentData[`allVoice.User.CategoryStat.${parentName}.${period}Duration`] = 0;
    });
    const guild = await client.guilds.fetch(guildID);
    const voiceChannels = guild.channels.cache.filter(channel =>
        channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildText
    );
    const bulkWriteOps = [];
    const unsetFields = {};
    Object.keys(resetData).forEach(key => {
        unsetFields[key] = "";
    });
    Object.keys(resetMesaj).forEach(key => {
        unsetFields[key] = "";
    });
    Object.keys(ParentData).forEach(key => {
        unsetFields[key] = "";
    });

    for (const channel of voiceChannels.values()) {
        if (channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildText) {
            const channelDataField = `allVoice.User.ChannelData.${channel.id}.${periodDataFields[period]}`;
            const streamerDataField = `allStreamer.ChannelData.${channel.id}.${periodDataFields[period]}`;
            const cameraDataField = `allCamera.ChannelData.${channel.id}.${periodDataFields[period]}`;
            const messageDataField = `allMessage.ChannelMessageData.${channel.id}.${period}Message`;

            const channelResetData = {
                [channelDataField]: "",
                [streamerDataField]: "",
                [cameraDataField]: "",
                [messageDataField]: "",
            };

            bulkWriteOps.push({
                updateMany: {
                    filter: { guildID: guildID },
                    update: {
                        $unset: { ...channelResetData },
                    },
                },
            });
        }
    }

    bulkWriteOps.push({
        updateMany: {
            filter: { guildID: guildID },
            update: {
                $unset: { ...unsetFields },
            },
        },
    });
    if (bulkWriteOps.length > 0) {
        try {
            // Tüm güncellemeleri aynı anda gerçekleştirin
            await GeneralUserStats.bulkWrite(bulkWriteOps);
            console.log("Sıfırlanan veriler:\n" + JSON.stringify(bulkWriteOps, null, 2));
        } catch (error) {
            console.error("Veriler sıfırlanırken bir hata oluştu:", error);
        }
    }
}

module.exports.config = {
    Event: Events.ClientReady,
    System: true,
};
