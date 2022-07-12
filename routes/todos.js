const { Router } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const ctrlUser = require('../controllers/user.controller')
const jwtHelper = require('../config/jwtHelper')

const { Todo } = require('../db/models/todo.model')


const { User } = require('../db/models/user.model')


// router.post('/todos', jwtHelper.verifyJwtToken ,(req,res) => {
    
//     console.log("You have hit the endpoint ", req._id)
//     User.find({ usedBy : req._id }).then((todos) => {
//         res.status(200).send({ msg : todos});
//     }).catch(e => {
//         console.log(e);
//     });
// });

router.post('/todos', jwtHelper.verifyJwtToken ,(req,res) => {
    
    console.log("You have hit the endpoint ", req._id)
    let title = req.body.title;
    let desc = req.body.desc;
    let active = req.body.active;
    let usedBy = req._id


    let newTodo = new Todo({
        title,
        desc,
        active,
        usedBy
        // _todo
    }) 
    // newTodo.save();
    newTodo.save().then((todoDoc) => {
        // The full todo document is returned
        res.status(200).send(todoDoc);
    }).catch(e => {
        console.log(e);
        res.status(404)
    })
    // res.send("Done")
    
});


router.get('/todosGet', jwtHelper.verifyJwtToken ,(req,res) => {
    console.log("You have hit endpoint")
    Todo.find({ usedBy: { $eq: req._id }}).then( (todos) => res.status(200).send({ msg : todos}) ).catch((err) => res.send("Error"))
  
}) 

router.delete('/todos/:id', (req, res,) => {
    console.log('hello', req.params)
    
    Todo.findByIdAndRemove({
        _id: req.params.id
    }).then((removedTodoDoc) => {
        res.status(200).json(removedTodoDoc)
    }).catch(e => {
        console.log(e)})
})


module.exports = router;

