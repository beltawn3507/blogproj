const express = require("express");
const path=require("path");
const app=express();
const PORT=8001;
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser")
const userroute=require("./routes/user");
const useblogroute=require("./routes/blog");
const { checkforauthenticationcookie } = require("./middleware/authentication");
const Blog = require("./models/blog");


//connect to mongo db
mongoose.connect("mongodb://127.0.0.1:27017/blogging")
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err);
})
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforauthenticationcookie("token"));

//view
app.set("view engine","ejs");
app.set("views",path.resolve("./view"));

app.get("/",async (req,res)=>{
    const allblogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blog:allblogs,
    });
})
app.use("/user",userroute);
app.use("/blog",useblogroute);





app.listen(PORT,()=>{console.log(`server started on port ${PORT}` )})
