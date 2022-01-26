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
        
        /**VK-commands*/

        /**Browser-commands */
        browserTabClose: false,
        /**Computer-commands*/
        isCompUnlock: false
    }
]

module.exports.commands = commands;