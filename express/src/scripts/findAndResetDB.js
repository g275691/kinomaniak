const { commands } = require("../../constants/commands");
const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");

const findAndResetDB = async (res) => {
    const collection = await getMongoDB('commands');
    const db = await collection.find({}).toArray();
    await res.send(db);
    await collection.updateOne({base: DB_NAME}, {$set: commands[0]})
}

module.exports.findAndResetDB = findAndResetDB;