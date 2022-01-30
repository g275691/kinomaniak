const express = require('express');
const app = express();

const https = require('https');
const http = require('http');

const fs = require('fs');
const options = {
    key: fs.readFileSync("../../server-ssl/domain.key", "utf-8"),
    cert: fs.readFileSync("../../server-ssl/domain.crt", "utf-8")
  };
const { PORT_HTTP, PORT_HTTPS } = require('./constants/ports');

const { findAndResetDB } = require('./src/scripts/findAndResetDB');
const { activateCommand } = require('./src/scripts/activateCommand');
const { getBaseArray } = require('./src/scripts/getBaseArray');
const { fullResetDB } = require('./src/scripts/fullResetDb');

app.get('/', async() => {
    console.log("user-enter")
})

app.get('/getbase', async (req, res) => {
    await getBaseArray(res)
})

app.get('/commandbase/command', async (req, res) => {
    await activateCommand(req.query, res)
    // fs.appendFile('../interface/testFile.txt', ' This line is beyond the end.', (err) => {
    //     if(err) throw err;
    //     console.log('Data has been added!');
    // });
})

app.get('/commandbase', async (req, res) => {
    await findAndResetDB(res);
})

fullResetDB()
http.createServer(app).listen(PORT_HTTP, ()=>console.log(`listen ${PORT_HTTP}`));
https.createServer(options, app)
.listen(PORT_HTTPS, ()=>console.log(`listen ${PORT_HTTPS}`))