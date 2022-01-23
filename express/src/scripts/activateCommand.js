const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");
const { newDBwithCommand } = require("./newDBwithCommand");

const activateCommand = async (req, res) => {
    const newCommand = req.params.command;
    const collection = await getMongoDB();
    const db = await collection.find({}).toArray();
    const newDB = await newDBwithCommand(db, newCommand);
    console.log(newDB);
    await collection.updateOne({base: DB_NAME}, {$set: newDB})
    await res.send(db)
}

module.exports.activateCommand = activateCommand;