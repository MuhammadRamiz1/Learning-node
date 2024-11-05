const UserModel=require("../models/User");

const registerUser=async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel({email,password});
    await user.save();
}
const loginUser=async(req,res)=>{
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
    res.send("Login User");
}

module.exports={registerUser,loginUser}