const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    desc: {
        type: String,
        required : true,
        minlength: 1,
        trim: true
     },

    active: {
        type : Boolean
    },

    usedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }


})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo }