const JWT=require("jsonwebtoken");
const secret ="ksnkdnkjndfkjnhahahalala";

function generateusertoken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileimageurl:user.profileimageurl,
        role:user.role
    };
    const token=JWT.sign(payload,secret);
    //console.log("hi",token);
    return token;
}

function validateuser(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports={generateusertoken,validateuser}