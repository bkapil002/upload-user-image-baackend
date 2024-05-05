const express = require('express');
const routes = express.Router();
const userSignUpController = require ("../controler/userSignUp.js")
const userSignInController = require("../controler/userSignin.js")
const userDataControler = require("../controler/userData.js")
const authToken = require("../middleware/authToken.js")
const userLogout = require("../controler/userLogout.js")


routes.post('/signUp' , userSignUpController)
routes.post('/signin', userSignInController)
routes.get('/user-details' ,authToken , userDataControler )
routes.get('/logout' , userLogout)


module.exports = routes