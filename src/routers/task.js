const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

// CREATE A TASK
router.post('/tasks', async (req, res) => {
    const new_task = new Task(req.body)
    try {
        await new_task.save()
        res.status(201).send(new_task)

    } catch (e) {
        res.status(400).send(e)
    } 
})
// GET ALL TASKS
router.get('/tasks', async (req, res) => {
    try {
        const users = await Task.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})
// GET A TASK BY ID
router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({'Error ':'invalid updates!'})
    }
    try {
        const _task = await Task.findById(req.params.id)
        updates.forEach((update) => _task[update] = req.body[update])
        await _task.save()
        
        // const _task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidator: true})
        if (!_task) {
            return res.status(404).send()
        }
        return res.send(_task)

    } catch (e) {
        res.status(400).send(e) // validation error
    }
})
// DELETE A TASK BY ID
router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router