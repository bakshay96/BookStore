const mongoose =require("mongoose");

const userSchema =new mongoose.Schema({

    
        // _id: ObjectId,
        name: String,
        email: String,
        password: String,
        isAdmin: Boolean
      
})

const UserModel =new mongoose.model("user", userSchema);
module.exports =UserModel;