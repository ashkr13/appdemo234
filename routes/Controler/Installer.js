const nonce = require('nonce')();
//api keys
const apiKey = 'afb95e8d48e66f4492036875282a1972';

const scopes = 'write_script_tags';
//Forwarding Adderess
const forwardingAddress = "https://appdemo234.herokuapp.com"; 


exports.installer = (req, res) => {
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
  }
  exports.me = (req,res)=>{
      res.send({
          message:"Aprajita"
      })
  }