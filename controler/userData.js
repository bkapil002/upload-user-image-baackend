const UserModel  = require("../models/UserModel")

async function userDataControler (req, res){

    try{

        console.log("user",req.userId)
        const user = await UserModel.findById(req.userId)
       

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message : "User details"
        });
        console.log(user)
    }catch(err){
        res.status(400).json({
            message : err.message || err ,
            error : true,
            success : false
         })
    }
}

module.exports = userDataControler;