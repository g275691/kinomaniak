const fs = require('fs');
const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");

const changeVideoMode = async (fileContent, req) => {
    await getListForPotplayer(req);
    let fileContentJSON = JSON.parse(fileContent.replace("const videoOptions = ", ""));
    let reqKey = Object.keys(req)[0];
    let reqValue = req[Object.keys(req)[0]]; 
    typeof req[Object.keys(req)[0]] == "string" && req[Object.keys(req)[0]].toLowerCase();
    reqValue == "true" && (reqValue = true);
    reqValue == "false" && (reqValue = false);
    
    fileContentJSON[0][reqKey] = reqValue;
    console.log(reqValue);

    return fileContentJSON;
}

const getListForPotplayer = async (req) => {
    
    req.potplayer  === "true" && (req.potplayer = true);
    req.potplayer  === "false" && (req.potplayer = false);
    if(!req.potplayer) return;
    const FILMS_FOLDER = 'c:/Down/';
    const ext = /\.(mpeg4)|(mp4)|(mkv)|(avi)$/i;
    let newFilmsList = [];

    const items = fs.readdirSync(`${FILMS_FOLDER}`);

    items.map(item=>{
        try {
            item && ext.test(item) && newFilmsList.push({ "name": item, "directory ": `${FILMS_FOLDER}/${item}` })
            const items2 = fs.readdirSync(`${FILMS_FOLDER}/${item}`);
            items2.map(item2=>{
                item2 && ext.test(item2) && newFilmsList.push({ "name": item2, "directory ": `${FILMS_FOLDER}/${item}/${item2}` })

            })
            items2.map(item2=>{
                const items3 = fs.readdirSync(`${FILMS_FOLDER}/${item}/${item2}`);
                items3.map(item3 => {
                    item3 && ext.test(item3) && newFilmsList.push({ "name": item3, "directory ": `${FILMS_FOLDER}/${item}/${item2}/${item3}` })
                })
            })
        } catch(err) {

        }

    })
    console.log(newFilmsList);
    await fs.writeFileSync('C:/!Yandex/kinomaniak/express/public/options/potplayerList.js', "const potplayerList = " + JSON.stringify(newFilmsList))
}

const refreshbase = async (req) => {
    req.potplayer  === "true" && (req.potplayer = true);
    req.potplayer  === "false" && (req.potplayer = false);
    const collection = await getMongoDB('commands');
    await collection.updateOne({base: DB_NAME}, {$set: req})
}

const setNewVideomode = async (req) => {

    let fileContent = await fs.readFileSync('C:/!Yandex/kinomaniak/express/public/options/videoOptions.js', "utf8");
    await refreshbase(req);
    const newFileContent = await changeVideoMode(fileContent, req);
    
    await fs.writeFileSync('C:/!Yandex/kinomaniak/express/public/options/videoOptions.js', "const videoOptions = " + JSON.stringify(newFileContent))
}

module.exports.setNewVideomode = setNewVideomode;