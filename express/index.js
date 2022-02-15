const express = require('express');
const app = express();
const client = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const https = require('https');
const http = require('http');
const open = require('open');
var cors = require('cors')

const fs = require('fs');
const options = {
    key: fs.readFileSync("../../server-ssl/server.key", "utf-8"),
    cert: fs.readFileSync("../../server-ssl/server.crt", "utf-8")
  };
const { PORT_HTTP, PORT_HTTPS } = require('./constants/ports');

const { findAndResetDB } = require('./src/scripts/findAndResetDB');
const { activateCommand } = require('./src/scripts/activateCommand');
const { getBaseArray } = require('./src/scripts/getBaseArray');
const { fullResetDB } = require('./src/scripts/fullResetDb');
const { setNewPopularBase } = require('./src/scripts/setNewPopularBase');
const { setNewVideomode } = require('./src/scripts/setNewVideoMode');

app.use(cors())

app
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.post('/popular-query', async (req, res) => {
    await setNewPopularBase(req.body);
})
.get('/', async() => {
    console.log("user-enter")
})
.get('/getbase', async (req, res) => {
    await getBaseArray(res)
})

.get('/commandbase', async (req, res) => {
    await findAndResetDB(res);
})
.get('/commandbase/command', async (req, res) => {
    console.log(req.query);
    await activateCommand(req.query, res)
})
.get('/videomode', async (req, res) => {
    //console.log(req.query)
    await setNewVideomode(req.query);   
})
.get('/potplayer', async (req, res) => {
    console.log(req.query);
    req.query.video && (await open(req.query.video));
})

client.use(cors())
client
.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})
client.use(express.static(__dirname));

http.createServer(client)
.listen(9999, ()=>console.log(`listen 9999`));

fullResetDB()
http.createServer(app)
.listen(PORT_HTTP, ()=>console.log(`listen ${PORT_HTTP}`));
https.createServer(options, app)
.listen(PORT_HTTPS, ()=>console.log(`listen ${PORT_HTTPS}`))