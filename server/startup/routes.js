const cors = require('cors')
const express = require('express')
const homeRouter = require('../routes/homeRouter')
module.exports = function(app){

app.use(cors())
app.use(express.json())
app.use("/home",homeRouter)
}