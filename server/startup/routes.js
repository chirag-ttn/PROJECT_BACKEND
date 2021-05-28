const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');
const formData = require('express-form-data')
const homeRouter = require('../routes/homeRouter')
const loginRouter = require('../routes/loginRouter')
const ProfileRouter = require('../routes/ProfileRouter')
const PostRouter = require('../routes/PostsRouter')
const UserRouter = require('../routes/userRouter')
const fileUpload = require('express-fileupload')
module.exports = function(app){
    
    app.use(cors())
    
    //parsing json
    app.use(express.json())
    // for parsing application/xwww-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 
    // for parsing multipart/form-data
    app.use(formData.parse())
    
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }));
    

app.use('/home',homeRouter)
app.use('/api/auth',loginRouter)
app.use('/profile',ProfileRouter)
app.use('/posts',PostRouter)
app.use('/users',UserRouter)
}