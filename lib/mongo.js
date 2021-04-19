const { MongoClient, ObjectID } = require('mongodb');

const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
    this.dbOpenConnection = null;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected');
      this.dbOpenConnection = this.client.db(this.dbName);

      return this.dbOpenConnection;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(collection, query) {
    try {
      if (!this.dbOpenConnection) {
        this.dbOpenConnection = await this.connect();
      }
      return await this.dbOpenConnection.collection(collection).find(query).toArray();
    } catch (error) {
      console.log(error);
    }
  }

  async get(collection, id) {
    try {
      if (!this.dbOpenConnection) {
        this.dbOpenConnection = await this.connect();
      }

      return await this.dbOpenConnection.collection(collection).findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.log(error);
    }
  }

  async create(collection, data) {
    try {
      if (!this.dbOpenConnection) {
        this.dbOpenConnection = await this.connect();
      }

      const { insertedId } = await this.dbOpenConnection.collection(collection).insertOne(data);
      return insertedId;
    } catch (error) {
      console.log(error);
    }
  }

  async update(collection, id, data) {
    try {
      if (!this.dbOpenConnection) {
        this.dbOpenConnection = await this.connect();
      }

      await this.dbOpenConnection.collection(collection).updateOne({
        _id: ObjectID(id)
      }, {
        $set: data
      }, {
        upsert: true
      });

      return id
    } catch (error) {
      console.log(error);
    }
  }

  async delete(collection, id) {
    try {
      if (!this.dbOpenConnection) {
        this.dbOpenConnection = await this.connect();
      }

      console.log(id)

      await this.dbOpenConnection.collection(collection).deleteOne({ _id: ObjectID(id) });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MongoLib