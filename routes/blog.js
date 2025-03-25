const {Router} = require('express');
const multer=require("multer");
const path=require("path");
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const router=Router();


const storage=multer.diskStorage({
  destination:function(req,res,cb){
     cb(null,path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const orignalName=`${Date.now()}--${file.originalname}`;
    cb(null, orignalName);
  }
})

const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    return res.render("addblog",{
        user:req.user
    });
})

router.get("/myblog",async(req,res)=>{
   try {
     const allblogs=await Blog.find({}).populate("createdby");
     console.log(allblogs);
     console.log("agaghaghahja",req.user);
     res.render("yourblog",{
       user:req.user,
       blog:allblogs,
       });
} catch (error) {
    next(err);
}
})

router.get('/:id',async (req,res)=>{
  //complete user
  const blog= await Blog.findById(req.params.id).populate("createdby");
  const comment=await Comment.find({blogid:req.params.id}).populate("createdby");
  return res.render("blog",{
    user:req.user,
    blog:blog,
    comment:comment,
  })
})


router.post("/",upload.single("coverImage"),async (req,res)=>{
  const {title,content}=req.body;
  const blog=await Blog.create({
       title,
       content,
       createdby:req.user._id,
       coverImageUrl:`uploads/${req.file.filename}`
  })
  return res.redirect(`/blog/${blog._id}`);
})

router.post("/comment/:blogid",async(req,res)=>{
     await Comment.create({
      content:req.body.content,
      blogid:req.params.blogid,
      createdby:req.user._id,
})
return res.redirect(`/blog/${req.params.blogid}`);
})

module.exports=router;