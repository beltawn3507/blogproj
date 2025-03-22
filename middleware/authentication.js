const { validateuser } = require("../services/authentication");

//takes a cookiename and if there is user it will pass its data to req.user 
function checkforauthenticationcookie(cookieName){
    return (req,res,next)=>{
        const tokencookievalue=req.cookies[cookieName];
        if(!tokencookievalue){
            next();
        }
        try {
          const userpayload=validateuser(tokencookievalue);
          req.user=userpayload;
        } catch (error) {}
        next();
    }
}

module.exports={checkforauthenticationcookie}