const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../auth-strategies/jwt')
router.get('/',
    passport.authenticate(['jwt'], { session: false }),
    (req, res) => {
        res.send('Secure response from ' + JSON.stringify(req.user));
    });

module.exports = router;