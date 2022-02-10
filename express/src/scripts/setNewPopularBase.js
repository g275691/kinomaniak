const fs = require('fs');

const changeContent = (fileContent, req) => {
    console.log(fileContent)
    let fileContentJSON = JSON.parse(fileContent.replace("const popularQuery = ", ""));
    fileContentJSON[req.favouriteNumber + 2].title = req.favouriteTitle;
    fileContentJSON[req.favouriteNumber + 2].url = req.favouriteUrl;
    return fileContentJSON;
}

const setNewPopularBase = async (req) => {

    let fileContent = await fs.readFileSync('../public/options/popularQuery.js', "utf8");
    const newFileContent = await changeContent(fileContent, req);
    await fs.writeFileSync('../public/options/popularQuery.js', "const popularQuery = " + JSON.stringify(newFileContent))
}

module.exports.setNewPopularBase = setNewPopularBase;