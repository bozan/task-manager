const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // automatically parse incoming JSONs

// CREATE A USER
app.post('/users', (req, res) => {

    const new_user = new User(req.body)
    new_user.save().then(() => {
        res.status(201).send(new_user)
    }).catch((e) => {
        res.statsu(400).send(e)
    })
})
// GET ALL USERS
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})
// GET A USER BY ID
app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => { // option -> User.findOne({_id}).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
//
// ****** TASKS **********
// CREATE A TASK
app.post('/tasks', (req, res) => {
    const new_task = new Task(req.body)
    new_task.save().then(() => {
        res.status(201).send(new_task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
// GET ALL TASKS
app.get('/tasks', (req, res) => {
    Task.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
// GET A TASK BY ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send(e.message)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
