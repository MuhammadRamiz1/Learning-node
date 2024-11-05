const express=require("express");
const { registerUser,loginUser } = require("../controllers/Auth");
const { createJWTToken, verifyJWTToken } = require("../services/jwt");
const app=express();


app.post("/register",registerUser)
app.post("/login",loginUser)

app.get("/",async(req,res)=>{
const t= await createJWTToken('aaaaaaaaa')
res.send(t)
    
})
app.get("/verify",(req,res)=>{
    const t=verifyJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWFhYWFhYWFhIiwiaWF0IjoxNzMwODA5OTYzLCJleHAiOjE3MzM0MDE5NjN9.xVVum_sum7KBeglDG5c0B9FfNCI1WGBrlOw_X7fr-ho')
    res.send({t,jti:t.jti})
        
    })

module.exports=app