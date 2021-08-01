require('../src/db/mongoose')
const Task = require('../src/models/task')

// // CHAINING
// Task.findByIdAndDelete('6105ad5eb9cc183ce98f2f5b').then((task) => {
//     console.log(task + ' is deleted')
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// ASYNC/AWAIT
const deleteTaskAndCount = async (id) => {
    const deleted = await Task.findByIdAndDelete(id)
    const countIncompleted = await Task.countDocuments({completed: false})
    return countIncompleted
}

deleteTaskAndCount('61059bfaff07f03a7282f2b9').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

