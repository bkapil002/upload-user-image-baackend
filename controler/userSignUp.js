
const UserModel = require("../models/UserModel")
const bcrypt = require('bcrypt');


async function userSignUpController(req , res){
    try{
        const {name , password , email , profilepic } = req.body
        let user = await UserModel.findOne({email})
        if(user){
            return res.status(200).json('Email is already register')
        }
        console.log(req.body)
        
        if(!email){
            throw new Error("Please Provide Email")
        }
        if(!password){
            throw new Error("Please Provide password")
        }
        if(!name){
            throw new Error("Please Provide name")
        }
        if(!profilepic){
            throw new Error("Please Provide name")
        }
       

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password , salt)

        if(!hashPassword){
            throw new Error ("Something is wrong")
        }
        const payload = {
            ...req.body,
            role:"GENERAL",
            password : hashPassword
        }
        const userData = new UserModel(payload)
        const saveUser = userData.save()

        res.status(201).json({
            data  : saveUser,
            success : true,
            error : false,
            message : "Connected sucessfully"
        })
        
    }catch(err){
         res.json({
            message : err.message || err ,
            error : true,
            suceess : false
         })
    }
}


module.exports = userSignUpController