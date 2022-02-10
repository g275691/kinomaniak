const { DB_NAME } = require("../../constants/DB");
const { getMongoDB } = require("./getMongoDB");

const fullResetDB = async () => {
    const collection = await getMongoDB('commands');
    await collection.updateOne({base: DB_NAME}, {$set: {"isYoutubeOpen":false,"youtubeVolumeUp":false,"youtubeVolumeDown":false,"isCompUnlock":false,"youtubePlay":false,"openVideo":false,"youtubeOpenVideo":false,"youtubeTimeLeft":false,"youtubeTimeRight":false,"youtubeFullScreen":false,"youtubeStatusPaused":"true","fullScreen":false,"browserZoomPlus":false,"browserZoomMinus":false,"browserTabClose":false,"browserTabLeft":false,"browserTabRight":false,"youtubeSubcriptions":false,"youtubeNumberVideo":false,"youtubeOpenVideoByNumber":false,"scrollDown":false,"scrollUp":false,"computerDisable":false}})
}
//dd
module.exports.fullResetDB = fullResetDB;