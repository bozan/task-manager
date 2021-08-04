const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) { // !file.originalname.endsWith('.pdf')
//             return cb(new Error('Please upload the word document'))
//         } 
//         cb(undefined, true)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


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

// const main = async () => {
    // const task = await Task.findById('610927913db7ec6ca5885a5a')
    // await task.populate('owner').execPopulate()  ??? TypeError: Cannot read property 'populate' of null
    // console.log(task.owner)

    // const user = await User.findById('610927913db7ec6ca5885a5a')
    // await user.populate('myTasks').execPopulate()
    // console.log(user.myTasks)
// }

// main()