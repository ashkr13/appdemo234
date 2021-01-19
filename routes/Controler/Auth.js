const crypto = require('crypto');
const cookie = require('cookie');
const querystring = require('querystring');
const request = require('request-promise');

//api keys
const apiKey = 'afb95e8d48e66f4492036875282a1972';
//api secrete keys
const apiSecret = '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';


exports.Auth = (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  // if (state !== stateCookie) {
  //   return res.status(403).send('Request origin cannot be verified');
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

    // DONE: Exchange temporary code for a permanent access token
    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
    .then((accessTokenResponse) => {
      // Access token -
      const accessToken = accessTokenResponse.access_token;
      // DONE: Use access token to make API call to 'shop' endpoint
      // const shopRequestUrl = 'https://' + shop + '/admin/api/2020-01/shop.json';
      //const shopProduct = 'https://' + shop + '/admin/api/2020-01/products.json';
      // const createScriptTagUrl = 'https://' + shop + '/admin/api/2020-01/script_tags.json'; 

      res.redirect('/test');
      })

      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
  
    } else {
      res.status(400).send('Required parameters missing');
    }
  }
 




  