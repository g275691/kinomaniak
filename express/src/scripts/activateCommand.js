const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");

const activateCommand = async (req, res) => {
    const collection = await getMongoDB('commands');
    const db = await collection.find({}).toArray();
    await collection.updateOne({base: DB_NAME}, {$set: req})
    await res.send(db)
}

module.exports.activateCommand = activateCommand;