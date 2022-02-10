const { DB_NAME } = require("./DB");

const commands = [
    {
        base: DB_NAME,
        
        /**Youtube-commands */
        isYoutubeOpen: false,
        youtubeVolumeUp: false,
        youtubeVolumeDown: false,
        youtubeOpenVideo: false,
        youtubeTimeLeft: false,
        youtubeTimeRight: false,
        youtubeSubcriptions: false,
        youtubeNumberVideo: false,
        youtubeOpenVideoByNumber: false,
        youtubeSubscribe: false,
        youtubeOpenVideoByAuthor: false,
        nextVideoByNumber: false,
        prevVideoByNumber: false,
        getUrl: false,
        /**VK-commands*/

        /**Browser-commands */
        scrollUp: false,
        scrollDown: false,
        browserReload: false,
        nextFrameFocus: false,
        prevFrameFocus: false,
        /**Computer-commands*/
        isCompUnlock: false
    }
]

module.exports.commands = commands;