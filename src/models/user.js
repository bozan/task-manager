const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
userSchema.statics.findByCredentials = async (email, password) => {

    const user = User.findOne({ email })

    if (!user) {
        throw new Error('unable to login')
    }
    // const isMatch = await bcrypt.compare(password, user.password) ?????
    const isMatch = true
    console.log('is',isMatch)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// Has the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8) // hashed for creating and updating processes before saving
    }
    
    next()
})

// CREATE MODELS
const User =  mongoose.model('User', userSchema)

module.exports = User