const fs = require('fs-extra');
const mongoose = require('mongoose');
const constants = require('./constants');

var schema = new mongoose.Schema({
    id: String,
    socketName: String,
    date: String,
    fileName: String,
    url: String,
    status: String,
    maxVotes: Number,
    colCount: Number,
    colNames: [],
    socketData: [],
    type: {},
    lines: [],
    risks: [],
    teamNames: [{}],
    progBoardDep: [],
    teamSprintCapa: []
});
var RetroModel = mongoose.model('Retro', schema);


const server = 'retrouser:password@localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'retro_db';      // REPLACE WITH YOUR DB NAME

const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, poolSize: 100 }

mongoose.connect(`mongodb://${server}/${database}?retryWrites=true&w=majority`, options).catch(err => { });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
let retrosArray = [];

let updateDatabase = async () => {
    process.stdout.write('Processing.');

    retrosArray = await fs.readJSONSync(constants.dataFile);

    retrosArray.forEach(async retro => {
        const retroExists = await RetroModel.exists({ id: retro.id });
        if (retroExists) {
            await RetroModel.findOneAndUpdate({ id: retro.id }, retro);
        } else {
            await RetroModel.create(retro);
        }

    });

    /*await RetroModel.find({}).then((retrosArray) => {
        fs.writeJSONSync(constants.dataFile,retrosArray);
    });*/

    console.log('\nImport completed\n');
};

let retriveRecords = async () => {
    await RetroModel.find({}).then((retrosArray) => {
        fs.writeJSONSync(constants.dataFile, retrosArray);
    });
};

db.on('open', async () => {
    console.log('Connected to mongo server.\n');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:: ', err.message);
});

module.exports = {
    updateDatabase: updateDatabase,
    retriveRecords: retriveRecords
};