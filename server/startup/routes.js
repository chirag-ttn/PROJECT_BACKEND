const cors = require('cors')
const express = require('express')
const homeRouter = require('../routes/homeRouter')
const loginRouter = require('../routes/loginRouter')
const secureRouter = require('../routes/secureRouter')
module.exports = function(app){

// app.use(cors())
app.use(express.json())
app.use("/home",homeRouter)
app.use('/api/auth',loginRouter)
app.use('/api/secure',secureRouter)
}