const { DB_NAME } = require("./DB");

const commands = [
    {
        base: DB_NAME,
        
        /**Youtube-commands */
        isYoutubeOpen: false,
        youtubeVolumeUp: false,
        youtubeVolumeDown: false,
        youtubePlay: false,
        youtubeOpenVideo: false,
        youtubeTimeLeft: false,
        youtubeTimeRight: false,
        youtubeSubcriptions: false,
        youtubeNumberVideo: false,
        youtubeOpenVideoByNumber: false,
    
        /**VK-commands*/

        /**Browser-commands */
        browserTabClose: false,
        scrollUp: false,
        scrollDown: false,
        /**Computer-commands*/
        isCompUnlock: false
    }
]

module.exports.commands = commands;