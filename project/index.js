
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

//api keys
const apiKey = 'afb95e8d48e66f4492036875282a1972';
//api secrete keys
const apiSecret = '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';

const scopes = 'write_script_tags,read_products,write_products';
//Forwarding Adderess
const forwardingAddress = "https://appdemo234.herokuapp.com/git ";


//Authentication creation of app
router.get('/shopify', (req, res) => {
const shop = req.query.shop;
if (shop) {
const state = nonce();
const redirectUri = forwardingAddress + '/shopify/callback';
const installUrl = 'https://' + shop +
'/admin/oauth/authorize?client_id=' + apiKey +
'&scope=' + scopes +
'&state=' + state +
'&redirect_uri=' + redirectUri;

res.cookie('state', state);
res.redirect(installUrl);
} else {
return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
}
});



//Redirect url after getitiing authentication scopes and url
router.get('/shopify/callback', (req, res) => {
const { shop, hmac, code, state } = req.query;
const stateCookie = cookie.parse(req.headers.cookie).state;

// if (state !== stateCookie) {
// return res.status(403).send('Request origin cannot be verified');
// }

if (shop && hmac && code) {
// DONE: Validate request is from Shopify
const map = Object.assign({}, req.query);
delete map['signature'];
delete map['hmac'];
const message = querystring.stringify(map);
const providedHmac = Buffer.from(hmac, 'utf-8');
const generatedHash = Buffer.from(
crypto
.createHmac('sha256', apiSecret)
.update(message)
.digest('hex'),
'utf-8'
);
let hashEquals = false;

try {
hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
} catch (e) {
hashEquals = false;
};

if (!hashEquals) {
return res.status(400).send('HMAC validation failed');
}







} else {
res.status(400).send('Required parameters missing');
}
});



module.exports = router;