const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    androidUrl : {
        type:String
    },
    iphoneUrl : {
        type:String
    },
    appImage :{
        type:String
    },
    bannerBackground :{
        type:String
    },
    bannerText :{
        type:String
    },
    bannerTextColor :{
        type:String
    },
    buttonText :{
        type:String
    },
    buttonTextColor :{
        type:String
    },
    buttonBackground :{
        type:String
    }
})

module.exports = Appdata = new mongoose.model("Appdata", appSchema)