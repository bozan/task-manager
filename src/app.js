const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json()) // automatically parse incoming JSONs
// USER
app.use(userRouter)
// TASK
app.use(taskRouter)

module.exports = app