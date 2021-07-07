const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

let stockSchema = new mongoose.Schema({
    Date: Date,
    Open: Number,
    High: Number,
    Low: Number,
    Close: Number,
    AdjClose: Number,
    Volume: Number,
    Company: String
})


let StockModel = mongoose.model('Model', stockSchema, 'Stocks')
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, poolSize: 100 }
const uri = 'mongodb+srv://admin:admin@cluster0.tupdq.mongodb.net/StocksDB?retryWrites=true&w=majority'
mongoose.connect(uri, options).catch(err => console.log(err));
mongoose.Promise = global.Promise;
db = mongoose.connection;
db.on('open', async () => console.log("connected to server "))

let fetchDistinctValues = async (search) => {
    const res = await StockModel.find({ "Company": { "$regex": search } }).distinct("Company", (error, docs) => { return; })
    return res;
}

let fetchCompnaydetails = async (company, page, size) => {
    const res = await StockModel.find({ "Company": company }, (err, docs) => { }).skip((page - 1) * size).limit(size);
    return res;
}

const fetchTotalCount = async (Company) => {
    const count = await StockModel.find({ Company: Company }, (err, docs) => { }).countDocuments();    
    return count
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.post('/search', async (req, res) => {
    const { searchCompany } = req.body
    try {
        const response = await fetchDistinctValues(searchCompany);
        res.send(response)
        } catch (err) {
        console.log(err)
    }
})

app.post("/fetchrecords", async (req, res) => {
    const { company, page, size } = req.body
    console.log("company -", company, "page -", page, "size -", size)
    console.log('inside fetchrecords route')
    try {
        const count = await fetchTotalCount(company);
        console.log("%%%%", count)
        const response = await fetchCompnaydetails(company, page, size);

        res.send({ data: response, count: count });
    } catch (err) {
        console.log(err)
    }
})

//const server = http.createServer(app)
server.listen(4000);



