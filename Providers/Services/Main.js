const { Collection } = require('discord.js');
const { readdirSync, lstatSync } = require(`fs`);
const { join, extname } = require(`path`);
//client.komutlar = new Collection();
client.komut = new Collection();

class Main {
    static async fileLoader(dir, allowedExtensions = ['.js']) {
      const filePaths = [];
      const readCommands = (dir) => {
        const files = readdirSync(join(process.cwd(), dir));
        files.forEach((file) => {
          const stat = lstatSync(join(process.cwd(), dir, file));
          if (stat.isDirectory()) {
            readCommands(join(dir, file));
          } else {
            const extension = extname(file);
            if (!allowedExtensions.includes(extension)) return;
            const filePath = join(process.cwd(), dir, file);
            filePaths.push(filePath);
          }
        });
      };
      readCommands(dir);
      return filePaths;
    }

    static async EventYükle() {
        const Events = await this.fileLoader('Events');
        for (const file of Events) {
          try {
            const referans = require(file);
            if (referans.config.System) {
              console.log('\x1b[32m%s\x1b[0m', `[ MYS EVENTS ] ${referans.config.Event} event yüklendi.`);
              client.on(referans.config.Event,referans);
            }
          } catch (error) {
            console.error(`Hata: Dosya yüklenirken bir hata oluştu: ${file}`);
            console.error(error);
          }
        }
    }

    static async KomutYükle() {
        const Commands = await this.fileLoader('Commands');
        for (const file of Commands) {
            try {
                const reference = require(file);
                if (reference.Active) {
                    console.log('\x1b[32m%s\x1b[0m', `[ MYS COMMANDS ] ${reference.Komut} komut yüklendi.`);
                    if (typeof reference.onLoad === 'function') reference.onLoad(client);
                    if (reference.Komut) {
                        reference.Komut.forEach(alias => client.komut.set(alias, reference));
                    }
                }
            } catch (error) {
                console.error(`Hata: Dosya yüklenirken bir hata oluştu: ${file}  Sebep : ${error}`);
            }
        }
    }
}

module.exports = { Main };
