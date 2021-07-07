const mongoose = require('mongoose');
const Schema = require('./../Models/stockModel');

let stockSchema = new mongoose.Schema(Schema)


let StockModel = mongoose.model('Model', stockSchema, 'Stocks')

const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, poolSize: 100 }

const uri = 'mongodb+srv://admin:admin@cluster0.tupdq.mongodb.net/StocksDB?retryWrites=true&w=majority'

mongoose.connect(uri, options).catch(err => console.log(err));

mongoose.Promise = global.Promise;


db = mongoose.connection;


db.on('open', async () => console.log("$$connected$$"))

const fetchDistinctValues = async (search) => {
    const res = await StockModel.find({ "Company": { "$regex": search } }).distinct("Company", (error, docs) => { return; })
    console.log(res)
    return res;
}

const fetchTotalCount = async (Company) => {
    console.log("inside FetchCOunt")
    const count = await StockModel.find({ Company: Company }, (err, docs) => { }).countDocuments();
    console.log("###", count)
    return count     
}
let fetchCompnaydetails = async (company, page, size) => {
    const res = await StockModel.find({ "Company": company }, (err, docs) => { console.log(docs) }).skip((page - 1) * size).limit(size);
    console.log(res)
    return res;
}


module.exports = {
    fetchDistinctValues,
    fetchTotalCount,
    fetchCompnaydetails,
}