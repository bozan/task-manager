require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndDelete('6105ad5eb9cc183ce98f2f5b').then((task) => {
    console.log(task + ' is deleted')
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})