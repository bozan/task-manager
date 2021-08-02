const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // automatically parse incoming JSONs

// ****** USER **********
// CREATE A USER
app.post('/users', async (req, res) => {
    const new_user = new User(req.body)

    try {
        await new_user.save()
        res.status(201).send(new_user)

    } catch (e) {
        res.status(400).send(e)
    }
})
// GET ALL USERS
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)

    } catch (e) {
        res.status(500).send()
    }       
})
// GET A USER BY ID
app.get('/users/:id', async (req, res) => {
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
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({'Error': 'invalid updates! '})
    }

    const _id = req.params.id
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidator: true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(400).send(e) // validation error 
    }
})
// DELETE A USER BY ID
app.delete('/users/:id', async (req, res) => {
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


//
// ****** TASK **********
// CREATE A TASK
app.post('/tasks', async (req, res) => {
    const new_task = new Task(req.body)
    try {
        await new_task.save()
        res.status(201).send(new_task)

    } catch (e) {
        res.status(400).send(e)
    } 
})
// GET ALL TASKS
app.get('/tasks', async (req, res) => {
    try {
        const users = await Task.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})
// GET A TASK BY ID
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e.message)
    }
})
// UPDATE A TASK BY ID 
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({'Error ':'invalid updates!'})
    }
    try {
        const _task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidator: true})
        if (!_task) {
            return res.status(404).send()
        }
        return res.send(_task)

    } catch (e) {
        res.status(400).send(e) // validation error
    }
})
// DELETE A TASK BY ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
