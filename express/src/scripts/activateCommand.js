const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");

const activateCommand = async (req, res) => {
    const collection = await getMongoDB('commands');
    const db = await collection.find({}).toArray();
    let newCommand = req;
    
    for (const key in newCommand) {
        newCommand[key] === "true" && (newCommand[key] = true);
        !isNaN(newCommand[key]) && (newCommand[key] = Number(newCommand[key]))
    }
    await collection.updateOne({base: DB_NAME}, {$set: newCommand})
    await res.send(db)
}

module.exports.activateCommand = activateCommand;