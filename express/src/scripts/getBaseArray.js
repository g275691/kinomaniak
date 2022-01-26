const { getMongoDB } = require("./getMongoDB");

const getBaseArray = async (res) => {
    const collection = await getMongoDB('commands');
    const db = await collection.find({}).toArray();
    await res.send(db);
}

module.exports.getBaseArray = getBaseArray;