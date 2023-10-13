const mongoose = require('mongoose');

const config = require('../Settings/Systems');

const mongoURI = config.MongoURL;

class MysMongoDb {
  static async Connect() {
    try {
      if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === null) {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          connectTimeoutMS: 30000,
        });
        console.log('MongoDB bağlantısı başarıyla açıldı.');
      }
      return mongoose.connection;
    } catch (error) {
      console.error('MongoDB bağlantısı sırasında bir hata oluştu:', error);
      throw error;
    }
  }

  static async Close() {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('MongoDB bağlantısı başarıyla kapatıldı.');
      }
    } catch (error) {
      console.error('MongoDB bağlantısı kapatılırken bir hata oluştu:', error);
      throw error;
    }
  }
}

module.exports = MysMongoDb;

