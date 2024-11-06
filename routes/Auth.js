const express=require("express");
const { registerUser,loginUser, updateMe } = require("../controllers/Auth");
const { createJWTToken, verifyJWTToken } = require("../services/jwt");
const catchAsync = require("../services/catchAsync");
const app=express();


app.post("/register",registerUser)
app.post("/login",loginUser)
app.patch("/updateMe",updateMe)

app.get("/",async(req,res)=>{
const t= await createJWTToken('aaaaaaaaa')
res.send(t)
    
})
app.get("/verify",catchAsync(async(req,res)=>{
    const t=await verifyJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWFhYWFhYWFhIiwiaWF0IjoxNzMwODg3MTY4LCJleHAiOjE3MzA4ODcxOTh9.jWE0HYtYUqfz7jPXm-M1MxG3eMTWsRSr Y2UjU2vABi0')
    // res.send({t,jti:t.jti})
        res.status(200).json({
            status:"success",
            t
        })
    }))



module.exports=app