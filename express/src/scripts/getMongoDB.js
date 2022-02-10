const { MongoClient } = require('mongodb');
const { DB_NAME } = require('../../constants/DB');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = DB_NAME;

const getMongoDB = async (collection) => {
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collection);
}

module.exports.getMongoDB = getMongoDB;