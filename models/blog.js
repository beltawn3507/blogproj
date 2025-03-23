const {Schema,model}=require("mongoose");

const blogschema= new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coverImageUrl:{
        type:String,
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Blog=model("blog",blogschema);

module.exports=Blog;