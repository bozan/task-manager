const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const jwt = require('jsonwebtoken')

// CREATE A USER
router.post('/users', async (req, res) => {
    const new_user = new User(req.body)

    try {
        const token = jwt.sign({ _id: new_user._id.toString() }, 'thisismynewcourse')
        new_user.tokens = new_user.tokens.concat({ token })
        await new_user.save()
        res.status(201).send({new_user, token})

    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
        user.tokens = user.tokens.concat({ token })
        await user.save()
        //const token = await User.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('Logged out successfully')
    } catch (e) {
        res.status(500).send(e)
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()

        res.send('Logged out from all session successfully')
    } catch (e) {
        res.status(500).send(e)
    }
})

// GET ALL USERS
router.get('/users/me', auth, async (req, res) => { // (route, middleware function, route handler)
    res.send(req.user)      
})
// GET A USER BY ID -> we dont need anymore
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)

//     } catch (e) {
//         res.status(500).send(e)
//     }
// })
// UPDATE A USER BY ID
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({'Error': 'invalid updates! '})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e) // validation error 
    }
})

// DELETE A USER BY ID
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
