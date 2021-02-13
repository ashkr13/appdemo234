const express = require('express');
const mongoose  = require('mongoose');
const route = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
require("dotenv").config();


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
});

const storage = multer.diskStorage({
    destination: "./public/images/uploads"
    ,
    filename:function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage : storage});

const App = require("../models/appdata");

route.get("/", async (req,res,next)=>{
    let allAppdata = await Appdata.find();
    res.status(200).json({allAppdata});
})

route.post("/", upload.single('appImage'), async (req,res,next)=>{
    
    let{iphoneUrl,androidUrl, bannerBackround, bannerText, bannerTextColor, buttonText, buttonTextColor, buttonBackground} = req.body;
    const image = req.file.path;
    const appImage = await cloudinary.v2.uploader.upload(image);

    const appdata = new Appdata({
        androidUrl: androidUrl,
        iphoneUrl : iphoneUrl,
        appImage : appImage.secure_url,
        bannerBackround : bannerBackround,
        bannerText : bannerText,
        bannerTextColor: bannerTextColor,
        buttonBackground : buttonBackground,
        buttonText : buttonText,
        buttonTextColor : buttonTextColor
    })

     await appdata.save();

    res.status(201).redirect("/");
})





module.exports = route;