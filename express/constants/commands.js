const { DB_NAME } = require("./DB");

const commands = [
    {
        base: DB_NAME,
        isYoutubeOpen: false,
        youtubeVolumeUp: false,
        youtubeVolumeDown: false,
        isCompUnlock: false
    }
]

module.exports.commands = commands;