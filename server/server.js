
const express = require('express')
const PORT = process.env.PORT || 4444;
const app = express()

require('./startup/db')()
require('./startup/routes')(app)

app.get('/',(req,res)=>{
    res.sendStatus(200).status(200,"BUZZZ")
})

app.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`)
})