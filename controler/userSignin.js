const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TOKEN_KEY = "DFSFSVVGRGSR"

async function userSignInController(req, res) {
    try {
        const { password, email } = req.body;

        if (!email) {
            throw new Error("Please provide an email");
        }

        if (!password) {
            throw new Error("Please provide a password");
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error("Email not found")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

       console.log(isPasswordValid)

       if(isPasswordValid){
            const tokenData = {
                id: user.id,
                email: user.email,
            }
   
            console.log('TOKEN_KEY:', TOKEN_KEY);

           const token = await jwt.sign(tokenData,TOKEN_KEY, { expiresIn: '8h' });

            const tokenOption = {
                httpOnly : true,
                secure : true,
            }
 
            res.cookie("token",token,tokenOption)
            return res.status(200).json({
                message:'login successfully',
                data : token,
                success : true,
                error : false
            })

       }else{
        throw new Error('Please check password')
       }

    } catch (err) {
        res.json({
            message : err.message || err ,
            error : true,
            success : false
         })
    }
}

module.exports = userSignInController;
