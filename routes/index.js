const dotenv = require('dotenv').config();
const hbs = require("hbs");
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const myInstaller = require('./Controler/Installer');
const Auth = require('./Controler/Auth');


router.get('/',(req,res)=>{
    res.render("home");
})


//Authentication creation of app
router.get('/shopify',myInstaller.installer);

//Redirect url after getitiing authentication scopes and url
router.get('/shopify/callback',Auth.Auth );
 
module.exports = router;