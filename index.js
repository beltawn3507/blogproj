const express = require("express");
const path=require("path");
const app=express();
const PORT=8001;
const mongoose=require("mongoose");

const userroute=require("./routes/user")

app.use(express.urlencoded({extended:false}));
//connect to mongo db
mongoose.connect("mongodb://127.0.0.1:27017/blogging")
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err);
})

//view
app.set("view engine","ejs");
app.set("views",path.resolve("./view"));

app.get("/",(req,res)=>{
    res.render("home");
})
app.use("/user",userroute);





app.listen(PORT,()=>{console.log(`server started on port ${PORT}` )})
