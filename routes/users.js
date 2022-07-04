const { Router } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const ctrlUser = require('../controllers/user.controller')
const jwtHelper = require('../config/jwtHelper')


const { User } = require("../db/models/user.model")

const oktaJwtVerifier = require("../config/oktaConfig")




router.post("/register", ctrlUser.register)

router.post('/authenticate', ctrlUser.authenticate)


router.get('/userProfile', jwtHelper.verifyJwtToken ,ctrlUser.userProfile)



router.post('/login-with-sso', oktaJwtVerifier.OKTA_Jwt_verifier ,ctrlUser.authenticate_sso)

router.get("/login-with-google", passport.authenticate("google", {
        scope: ["profile", "email"]
      })
    
)

router.get("/login-with-google/callback", passport.authenticate("google", (req, res) => {
    successRedirect: '//http:localhost:4200';
    failureRedirect: '//http:localhost:4200/sign-up'
    
}))



router.get("/logout", (req,res) => {

})




module.exports = router;