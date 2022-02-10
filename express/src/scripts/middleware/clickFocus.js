const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");

const clickFocus = async (req, res, next) => {
    const collection = await getMongoDB('commands');
    await collection.updateOne({base: DB_NAME}, {$set: {"focusClick":true}})
    next()
}

module.exports.clickFocus = clickFocus;