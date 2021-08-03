const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// middleware function (methods work except GET)
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request are disabled')
//     } else {
//         next()
//     }
// })
// middleware function 2 (maintenance mode)
// app.use((req, res, next) => {
//     res.status(503).send('The web-site is in maintenance, check back soon')
// })
// without middleware:  new request -> run route handler
// with middleware:  new request -> do something -> run route handler



app.use(express.json()) // automatically parse incoming JSONs
// USER
app.use(userRouter)
// TASK
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('610927913db7ec6ca5885a5a')
    // await task.populate('owner').execPopulate()  ??? TypeError: Cannot read property 'populate' of null
    // console.log(task.owner)

    // const user = await User.findById('610927913db7ec6ca5885a5a')
    // await user.populate('myTasks').execPopulate()
    // console.log(user.myTasks)
}

main()