 
const dotenv = require('dotenv').config();
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
var shopModel = require('../models/shop');
var fullshopModel = require('../models/fullshop');

const sgMail = require('@sendgrid/mail');

const myInstaller = require('./Controler/Installer');
const Auth = require('./Controler/Auth');
//api keys
const apiKey = 'afb95e8d48e66f4492036875282a1972';
//api secrete keys
const apiSecret = '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';

const scopes = 'write_script_tags,read_products,write_products';
//Forwarding Adderess
const forwardingAddress = "https://appdemo234.herokuapp.com"; 


//Authentication creation of app
router.get('/shopify',myInstaller.installer);
router.get('/og',myInstaller.me)


//Redirect url after getitiing authentication scopes and url
router.get('/shopify/callback',Auth.Auth );
 
module.exports = router;