const express = require('express')
const router = express.Router();
console.log('Inside hom')
router.get('/',(req,res)=>{
    
    return res.send('home')
})
module.exports  = router;