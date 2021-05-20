const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req,res,next)=>{
    const token = req.headers.authorization
    try{
        let user = jwt.verify(token,process.env.SECRET_OR_KEY)
        req.user = user
        next()
    }
    catch(ex){
        res.status(400).send('INVALID TOKEN')
    }
}
