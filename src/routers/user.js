const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const jwt = require('jsonwebtoken')

// CREATE A USER
router.post('/users', async (req, res) => {
    const new_user = new User(req.body)

    try {
        await new_user.save()
        res.status(201).send(new_user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
        //const token = await User.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }

})
// GET ALL USERS
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)

    } catch (e) {
        res.status(500).send()
    }       
})
// GET A USER BY ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})
// UPDATE A USER BY ID
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({'Error': 'invalid updates! '})
    }

    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidator: true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(400).send(e) // validation error 
    }
})
// DELETE A USER BY ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
