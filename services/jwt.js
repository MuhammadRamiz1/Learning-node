const jwt=require("jsonwebtoken");

const createJWTToken=async(data)=>{
    console.log('test', process.env.JWT_EXPIRY_TIME,process.env.JWT_SECRET_KEY)
    const token =await jwt.sign({data}, process.env.JWT_SECRET_KEY, { expiresIn:process.env.JWT_EXPIRY_TIME });
    return token;
}
const verifyJWTToken=(token)=>{
    const data=jwt.verify(token, process.env.JWT_SECRET_KEY);
    return data;
}


module.exports={createJWTToken, verifyJWTToken}