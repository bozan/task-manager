require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('6105aa1904a0333bedfbae96', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})  // return the next promise ->chaining
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})