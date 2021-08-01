const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // automatically parse incoming JSONs

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
//
// ****** TASKS **********
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

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
