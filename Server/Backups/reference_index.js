let SocketUtils = require('./socketUtils');
let express = require('express');
let fs = require("fs-extra");
var path = require('path');
let serverConstants = require("./constants");
// App setup
let app = express();
const axios = require('axios');
const db = require('../Database/database');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/retrieveBackup', (oreq, ores) => {
    db.retriveRecords();
    ores.send("Deleted records retrieved successfully!");
});

app.get('/downloadRetro', function(req, res) {
    res.download(path.join(__dirname + '/asset/retro_extension.zip'));
});

app.get('/downloadPoker', function(req, res) {
    res.download(path.join(__dirname + '/asset/planning_poker.zip'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/asset/index.html'));
});

setInterval(() => {
    db.updateDatabase();
}, 86400000);


let server = app.listen(4000, function () {
    console.log('listening for requests on port 4000,');
});

//Read stored sessions from file

let activeSockets;
try {
    activeSockets = fs.readJSONSync(serverConstants.dataFile);
} catch (error) {
    console.log(error.message);
}

let socUtils = new SocketUtils(server);
socUtils.createConnection(activeSockets);

