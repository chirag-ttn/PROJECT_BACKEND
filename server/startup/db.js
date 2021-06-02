const mongoose = require('mongoose')
require('dotenv').config()

module.exports = function(){
    // console.log(process.env.MONGO_URL)
    mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Database connected!')
    })
    .catch(err=>{
        console.log('connection error',err.message)
    })
    
    
}
