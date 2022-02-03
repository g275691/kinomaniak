const fs = require('fs');
const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");

const changeVideoMode = (fileContent, req) => {
    let fileContentJSON = JSON.parse(fileContent.replace("const videoOptions = ", ""));
    fileContentJSON[0].mode = req.toLowerCase();
    return fileContentJSON;
}

const refreshbase = async (req) => {
    const collection = await getMongoDB('commands');
    await collection.updateOne({base: DB_NAME}, {$set: {"videoMode" : req}})
}

const setNewVideomode = async (req) => {

    let fileContent = await fs.readFileSync('../interface/src/options/videoOptions.js', "utf8");
    await refreshbase(req);
    const newFileContent = await changeVideoMode(fileContent, req);
    
    await fs.writeFileSync('../interface/src/options/videoOptions.js', "const videoOptions = " + JSON.stringify(newFileContent))
}

module.exports.setNewVideomode = setNewVideomode;