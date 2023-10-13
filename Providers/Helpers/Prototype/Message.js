const { TextChannel } = require("discord.js");
const Webhooklar = {};
const client = global.client;

Promise.prototype.sil = async function(delayInSeconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this);
      }, delayInSeconds * 1000);
    }).then((message) => {
      if (message && message.deletable) {
        return message.delete().catch(console.error);
      }
      return null;
    });
};

String.prototype.splitMessage = function(size) {
  const xChunks = Math.ceil(this.length / size);
  const chunks = new Array(xChunks);
  for (let i = 0, c = 0; i < xChunks; ++i, c += size) {
    chunks[i] = this.substring(c, c + size);
  }
  return chunks;
};

TextChannel.prototype.wsend = async function (content, options) {
    if (Webhooklar[this.id]) return (await Webhooklar[this.id].send(content, options));
    let entegrasyonlar = await this.fetchWebhooks();
    let webh = entegrasyonlar.find(e => e.name == client.user.username),
        result;
    if (!webh) {
        webh = await this.createWebhook({
            name:   client.user.username,
            avatar: this.eGet('mys_6422')
        });
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    } else {
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    }
    return result;
};
  