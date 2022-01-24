const express = require('express');
const app = express();

const https = require('https');
const http = require('http');
const fs = require('fs');
const options = {
    key: fs.readFileSync("../interface/server-ssl/domain.key", "utf-8"),
    cert: fs.readFileSync("../interface/server-ssl/domain.crt", "utf-8")
  };
const { PORT_HTTP, PORT_HTTPS } = require('./constants/ports');

const { findAndResetDB } = require('./src/scripts/findAndResetDB');
const { activateCommand } = require('./src/scripts/activateCommand');
const { refreshStatus } = require('./src/scripts/refreshStatus');

app.get('/', async() => {
    console.log("user-enter")
})

app.get('/commandbase/command', async (req, res) => {
    await activateCommand(req.query, res)
})

app.get('/commandbase', async (req, res) => {
    await findAndResetDB(res);
})

app.get('/status', async (req, res) => {
    console.log(req.query);
    await refreshStatus(req.query);
})

http.createServer(app).listen(PORT_HTTP, ()=>console.log(`listen ${PORT_HTTP}`));
https.createServer(options, app).listen(PORT_HTTPS, ()=>console.log(`listen ${PORT_HTTPS}`));