require('dotenv').config()
const express = require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||8001;
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser")
const userroute=require("./routes/user");
const useblogroute=require("./routes/blog");
const { checkforauthenticationcookie } = require("./middleware/authentication");
const Blog = require("./models/blog");


//connect to mongo db
mongoose.connect(process.env.MONGO_URL)
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
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send("Internal Server Error");
});

app.get("/",async (req,res)=>{
    try {
        const allblogs=await Blog.find({});
        console.log("blog",typeof(allblogs[0].createdby));
        if(req.user){console.log("req.user",req.user);}
    res.render("home",{
        user:req.user,
        blog:allblogs,
    });
    } catch (error) {
        next(error);
    }
})


app.use("/user",userroute);
app.use("/blog",useblogroute);

// console.log(req.user);


app.listen(PORT,()=>{console.log(`server started on port ${PORT}` )})
