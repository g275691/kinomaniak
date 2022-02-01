// {
//     favouriteNumber: 3,
//     favouriteTitle: 'ЕМЕЛЬЯНЕНКО',
//     favouriteUrl: 'https://www.youtube.com/watch?v=TnI7fcP_Pnk'
//   }

const fs = require('fs');

const changeContent = (fileContent, req) => {
    let fileContentJSON = JSON.parse(fileContent.replace("const popularQuery = ", ""));
    fileContentJSON[req.favouriteNumber + 2].title = req.favouriteTitle;
    fileContentJSON[req.favouriteNumber + 2].url = req.favouriteUrl;
    return fileContentJSON;
}

const setNewPopularBase = async (req) => {

    let fileContent = await fs.readFileSync('../interface/src/options/popularQuery.js', "utf8");
    const newFileContent = await changeContent(fileContent, req);
    await fs.writeFileSync('../interface/src/options/popularQuery.js', "const popularQuery = " + JSON.stringify(newFileContent))
}

module.exports.setNewPopularBase = setNewPopularBase;