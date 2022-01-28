const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
const { getMongoDB } = require('./src/scripts/getMongoDB');
const { DB_NAME } = require('./constants/DB');

app.get('/getbase', async (req, res) => {
    await getBaseArray(res)
})

app
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.put('/commandbase/command', async (req, res) => {
    console.log(req.body)
    await activateCommand(req.body, res)
})

app.get('/commandbase', async (req, res) => {
    await findAndResetDB(res);
})

// app.use('/', async (req, res, next) => {
//     const collection = await getMongoDB('commands');
//     await collection.updateOne({base: DB_NAME}, {$set: {"focusClick":true}})
//     next()
// });

fullResetDB();
http.createServer(app).listen(PORT_HTTP, ()=>console.log(`listen ${PORT_HTTP}`));
https.createServer(options, app).listen(PORT_HTTPS, ()=>console.log(`listen ${PORT_HTTPS}`));