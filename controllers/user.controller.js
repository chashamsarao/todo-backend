const { Router } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const _ = require("lodash")



const { User } = require("../db/models/user.model")
const oktaJwtVerifier = require("../config/oktaConfig")




module.exports.register = (req, res, next) => {
    console.log("You have hit the endpoint")
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password
    let newUser = new User({username, email, password});
    
    newUser.save((err,userInfo) => {
        if(!err) {
            res.status(200).send(userInfo) // send the user info 
        }
        else
            if (err.code == 11000) { res.status(422).send(['Duplicate email address found.'])}
            else
                return next(err)
    })
}




module.exports.authenticate =  (req, res, next) => {
    // Call for passport authentication
    passport.authenticate('local', (err, newUser, info) => {
        // error from passport middelware
        if(err) return res.status(400).json(err);
        // registered user
        else if (newUser) return res.status(200).json({"token" : newUser.generateJwt() })
        // Unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);

}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id},
        (err, newUser) => {
            if (!newUser)
                return res.status(404).json({ status : false, message : 'User record not found'})

            else 
                return res.status(200).json({ status : true, user: _.pick(newUser, [ 'username', 'email'])})
        })
}

module.exports.authenticate_sso = (req, res, next) => {

    User.findOne({ email :{$eq : req.body.email } },
        (err,newUser) => { 

        if (!newUser){
            let username = req.body.username;
            let email = req.body.email;
            let password = '12345'
            let newUser = new User({username, email, password});
            newUser.save()
            return res.status(200).send({"token" : newUser.generateJwt()})
        }
        
        else if (err){
            return res.status(404).send({ 'Error' : err})
        }
            
                

        else
            return res.status(200).send({"token" : newUser.generateJwt() })

        
        
    })

}