const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    completed:{
      type:Boolean,
      default:false

    },
    priority:{
        type:String,
        required:true,
        enum:['low','medium','high'],

        default:"low"
    },
    dueDate:{
        type:Date,
        
    }
})

const postModel = mongoose.model("todo",postSchema);

module.exports = postModel;