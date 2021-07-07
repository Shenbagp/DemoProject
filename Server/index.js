const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./Database/database')

 


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.post('/search', async (req, res) => {
    const { searchCompany } = req.body
    console.log("searchCompany" , searchCompany)
    try {
        //const response = await fetchDistinctValues(searchCompany);
        const response = await db.fetchDistinctValues(searchCompany)
        //res.send(response)
        res.json(response)
        } catch (err) {
        console.log(err)
    }
})

app.post("/fetchrecords", async (req, res) => {
    const { company, page, size } = req.body
    console.log("company -", company, "page -", page, "size -", size)
    console.log('inside fetchrecords route')
    try {
        const count = await db.fetchTotalCount(company);
        console.log("%%%%", count)
        const response = await db.fetchCompnaydetails(company, page, size);

        res.json({ data: response, count: count });
        //res.send({ data: response, count: count });
    } catch (err) {
        console.log(err)
    }
})

db.fetchDistinctValues("SP");

db.fetchCompnaydetails("SPY" , 2, 10)
const server = http.createServer(app)
server.listen(4000);



