const express = require("express");
const path=require("path");
const app=express();
const PORT=8001;
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser")
const userroute=require("./routes/user");
const useblogroute=require("./routes/blog");
const { checkforauthenticationcookie } = require("./middleware/authentication");


//connect to mongo db
mongoose.connect("mongodb://127.0.0.1:27017/blogging")
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err);
})

app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforauthenticationcookie("token"));

//view
app.set("view engine","ejs");
app.set("views",path.resolve("./view"));

app.get("/",(req,res)=>{
    res.render("home",{
        user:req.user,
    });
})
app.use("/user",userroute);
app.use("/blog",useblogroute);





app.listen(PORT,()=>{console.log(`server started on port ${PORT}` )})
