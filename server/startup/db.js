const mongoose = require('mongoose')
module.exports = function(){

    mongoose.connect('mongodb://localhost:27017/buzzz',{useNewUrlParser:true})
    .then(()=>{
        console.log('Database connected!')
    })
    .catch(err=>{
        console.log('connection error',err.message)
    })
    
    
}
