const jwt=require("jsonwebtoken");

const createJWTToken=async(data)=>{
    console.log('test', process.env.JWT_EXPIRY_TIME,process.env.JWT_SECRET_KEY)
    const token =await jwt.sign({data}, process.env.JWT_SECRET_KEY, { expiresIn:process.env.JWT_EXPIRY_TIME });
    return token;
}
const verifyJWTToken=async(token)=>{
    const data=await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(data)
    
    return data;
}



module.exports={createJWTToken, verifyJWTToken}



