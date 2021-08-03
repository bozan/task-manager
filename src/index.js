const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // automatically parse incoming JSONs
// USER
app.use(userRouter)
// TASK
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

