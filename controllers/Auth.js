const UserModel=require("../models/User");
const catchAsync = require("../services/catchAsync");
const { createJWTToken } = require("../services/jwt");

const registerUser=catchAsync(async(req,res)=>{
    const {name,gender, age,preferences ,email,password}=req.body;
    const data={
        name,gender, age,preferences ,email,password
    }
    for(const [key,value] of Object.entries(data)){
        if(!value){
            return res.status(400).send({message:`${key} is required`});
        }
    }
    const user=new UserModel(data);
    await user.save();
    res.status(200).json({status:"success",data:user});
})
const loginUser=catchAsync(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).send("Email or Password is required");
    }
    const findUser=await UserModel.findOne({email}).select("+password");
    if(!findUser){
        return res.status(400).send("User not found");
    }

    if(findUser.password!==password){
        return res.status(400).send("Email or Password is incorrect");
    }
    findUser.password=undefined;
    const accessToken=await createJWTToken(findUser?.id);
    res.send({user:findUser, accessToken});
})

const updateMe=catchAsync(async(req,res)=>{
    const {name,gender,age,preferences}=req.body;
    req.user={_id:req?.body?.id}
    const user=await UserModel.findById(req.user._id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const data={name,gender,age,preferences};
    const updatedUser=await UserModel.findByIdAndUpdate(req.user._id,data, {
        new: true,});
    res.status(200).json({status:"success",data:updatedUser});
})

module.exports={registerUser,loginUser,updateMe}