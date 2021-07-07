const mongoose = require ('mongoose')
const Schema = new mongoose.Schema ({
            Date: Date,
            Open : Number ,
            High : Number ,
            Low : Number ,
            Close : Number ,    
            AdjClose : Number ,
            Volume : Number ,    
            Company : String 
        })

module.exports = Schema ; 