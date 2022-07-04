require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    
    username: {
      type: String,
      index: true,
      required : 'Username can\'t be empty'
    },
    email: {
      type: String,
      required : 'Email can\'t be empty',
      unique : true
    },
    
    googleId: {  
      id: String,
      token: String,
      required : false
    },
    
    password : {
      type: String,
      required : 'Password can\'t be empty',
      minlength : [4, 'Password must be atleast 4 characters long']
    },

    User_todos : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Todo'
      }
    ],

    saltSecret: String

  });

// Adding custom validation for email
UserSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

// Addding a pre-event 
  UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
    });
  });

  // Methods
  UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  
  UserSchema.methods.generateJwt = function() {
    let token = jwt.sign({ _id : this._id}, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXP})
    return token
  }

  
 

  const User =  mongoose.model("User", UserSchema);

  module.exports = { User }
  