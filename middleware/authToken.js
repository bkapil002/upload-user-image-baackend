const  jwt = require('jsonwebtoken');
const TOKEN_KEY = "DFSFSVVGRGSR"
async function authToken(req,res ,next){

    try{

        const token = req.cookies?.token 
        console.log(token)

        if(!token){
            return res.json({
                message : "User not login",
                error : true,
                success : false
            })
        }
        jwt.verify(token, TOKEN_KEY, function(err, decoded) {
            console.log(err)
            console.log(decoded)
            
            if(err){
                console.log(err)
            }
            req.userId = decoded?.id
            next()
          });


    
    }catch(err){
        res.status(400).json({
            message : err.message || err ,
            data : [],
            error : true,
            success : false
         })
    }
}

module.exports = authToken