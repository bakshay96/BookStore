const mongoose =require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery',true);

const main= async ()=>{
    const connect =await mongoose.connect(process.env.MONGO);
    console.log("connected to DB");
}

module.exports = main;