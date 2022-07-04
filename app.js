
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





 
// Route Handlers

app.get('/testing', (req,res) => {

    res.send("Hi Successful")
    console.log("Yo have hit the end pont")
    
})

// Get all todos

app.get('/todos',  (req,res) => {
    Todo.find({}).then((todos) => {
        res.status(200).send({ msg : todos});
    }).catch(e => {
        console.log(e);
    });

    // We want to return an array of lists in the database
})

// Post
// Purpose: creating / adding a todo



app.post('/todos', (req,res) => {
    // We want to add a todo and return the new array with the added todo back to the user (which includes the id)
    // The todo information will be passed via the JSON request body
    let title = req.body.title;
    let desc = req.body.desc;
    let active = req.body.active;


    let newTodo = new Todo({
        title,
        desc,
        active,
        // _todo
    }) 
    newTodo.save().then((todoDoc) => {
        // The full todo document is returned
        res.send(todoDoc);
    }).catch(e => {
        console.log(e);
    })


});


// Path /todos/:id
app.delete('/todos/:id', (req, res,) => {
    console.log('hello', req.params)
    // We want to delete the specified todo
    Todo.findByIdAndRemove({
        _id: req.params.id
    }).then((removedTodoDoc) => {
        res.json(removedTodoDoc)
    }).catch(e => {
        console.log(e)})
})

app.listen(3000, (req,res) => {
    console.log("Running on port 3000");
})







