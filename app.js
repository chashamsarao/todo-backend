
require('dotenv').config();
require('./config/passportConfig');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { mongoose } = require('./db/mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');

const session = require('express-session')

// Loading the mongoose models
const { Todo } = require('./db/models/todo.model');

// import the routes handling users
const userRouting = require("./routes/users");
const todoRouting = require("./routes/todos")





// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(passport.initialize());
// Start


// app.use(passport.session());

// End
app.use('/api', userRouting);
app.use('/user', todoRouting)

// Error Handler

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError' ) {
        var valErrors = []
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});



app.listen(3000, (req,res) => {
    console.log("Running on port 3000");
})


module.exports = app





