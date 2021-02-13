const mongoose = require('mongoose');
const connect = async ()=>{
await mongoose.connect(process.env.DB_CONNECTION,{useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true})
 .then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err)
 });
}
module.exports = connect;