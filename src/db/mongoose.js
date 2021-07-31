const { mongo } = require('mongoose')
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// CREATE MODELS
const User =  mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

// CREATE A OBJECT
const me = new User({
    name: '    Ozan6   ',
    email: ' OZAN@itu.edu.tr   ',
    password: 'passworddf '
})

// // SAVE TO THE DATABASE
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!' + error)
// })

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

// CREATE A OBJECT
const firstTask =  new Task({
    description: 'This is my third task!   ',
    completed: false
})

// SAVE TO THE DATABASE
firstTask.save().then(() => {
    console.log(firstTask)
}).catch((error) => {
    console.log('Error! ' + error)
})

