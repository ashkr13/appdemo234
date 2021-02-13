var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require("multer");
// const cloudinary = require('cloudinary');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
const staticPath = path.join(__dirname, "/public");
const viewPath = path.join(__dirname, "./routes/views");

app.set('views', viewPath);
app.set('view engine', 'twig');
app.set("view engine", "hbs");

const connect = require("./models/connection");
const userroute = require("./API/appdata");

app.use("/appdata", userroute); 
connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(staticPath));

// Router
app.use(indexRouter);




app.use((req,res,next)=>{
  const error = new Error("No route found");
         error.status = 404;
         next(error);
});

app.use((error,req,res,next)=>{
   res.status(error.status || 500);
    res.json({
        error:{
          message:error.message
        }
    })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
let port = process.env.PORT || 7001;
app.listen(port,()=>console.log(`Server is running on http://localhost:${port}`))
// module.exports = app;