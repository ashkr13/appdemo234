const dotenv = require('dotenv').config();
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const myInstaller = require('./Controler/Installer');
const Auth = require('./Controler/Auth');

router.get('/test',(req,res)=>{
    res.status(200).json({
        message:"flag1"
    })
})


//Authentication creation of app
router.get('/shopify',myInstaller.installer);

//Redirect url after getitiing authentication scopes and url
router.get('/shopify/callback',Auth.Auth );
 
module.exports = router;