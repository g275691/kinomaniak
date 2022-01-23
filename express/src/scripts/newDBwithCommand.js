const newDBwithCommand = (db, command) => {
    for (let key in db[0]) {
        key == command 
        ? db[0][key] = true
        : delete db[0][key]
    }
    return db[0]
}

module.exports.newDBwithCommand = newDBwithCommand;