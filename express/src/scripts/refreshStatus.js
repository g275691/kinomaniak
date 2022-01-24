const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB")

const refreshStatus = async (req) => {
    const collection = await getMongoDB("status");
    console.log("test")
    await collection.updateOne({base: DB_NAME}, {$set: req})
    // if(!Object.keys(req).length) {
    //     const db = await collection.find({}).toArray();
    //     return db;
    // } else {
        
    // }
}

module.exports.refreshStatus = refreshStatus;