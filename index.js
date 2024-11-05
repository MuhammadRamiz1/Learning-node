const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
// const bodyParser=require("body-parser");
const app=express();
require("dotenv").config();

// Routes
const AuthRoutes=require("./routes/Auth");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.enable('trust proxy', 1);

app.use("/api/v1/auth",AuthRoutes);











app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected to MongoDB");
      }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });

})