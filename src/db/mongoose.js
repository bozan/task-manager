const { mongo } = require('mongoose')
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// CREATE MODELS
const Task =  mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// // CREATE A OBJECT
// const firstTask =  new Task({
//     description: 'This is my third task!   ',
//     completed: false
// })

// // SAVE TO THE DATABASE
// firstTask.save().then(() => {
//     console.log(firstTask)
// }).catch((error) => {
//     console.log('Error! ' + error)
// })

