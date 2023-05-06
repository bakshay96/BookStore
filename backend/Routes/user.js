const express =require("express")
const {Router} =require("express");
const UserModel=require("../models/userModel");
const jwt =require("jsonwebtoken");
const bcrypt =require("bcrypt");
require("dotenv").config();

const userRouter=Router();


//get users
userRouter.get("/",async (req,res)=>{
    try {
        const users=await UserModel.find();
        res.send(users);
        
    } catch (error) {
        
        res.send({"msg":"please login","error":error.message})
    }
})


//register user 
userRouter.post("/register",async(req,res)=>{
    try {
        const payload =req.body;
        const userData =await UserModel.findOne({email:payload.email});

        if(userData)
        {
            res.send({"result":"User already exitst, Please login "});

        }
        else{
            const passwordHash =await bcrypt.hashSync(payload.password,8);
            console.log("hash pass",passwordHash)

            const newUser =UserModel(payload);
            await newUser.save();

            res.json({"result":"Registration Successfull..!"});
        }
        
    } catch (error) {
       
        res.send({"error":error.message})
    }
})

//for login user
// post request

userRouter.post("/login", async(req,res)=>{

    try {
        const payload =req.body;
        const userData =await UserModel.findOne({email:payload.email})
        if(! userData)
        {
            res.send({"result":"Please register first"});
        }
        
        const correctPassword =await bcrypt.compareSync(
            payload.password,
            userData.password
        )
        if(correctPassword)
        {
            const token= await jwt.sign({email:userData.email, user_id:userData._id},BookStoreApp);
            res.status(200).json({"result":"Login successfull", token})
        }
        else{
            res.status(401).json({"result":"No user found in db"});
        }
        
    } catch (error) {
        
        res.send({"error":error});
    }
})

module.exports= userRouter;