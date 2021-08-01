require('../src/db/mongoose')
const User = require('../src/models/user')

// CHAINING
// User.findByIdAndUpdate('6105aa1904a0333bedfbae96', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})  // return the next promise ->chaining
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// ASYNC/AWAIT
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age}) // age:age
    const count = await User.countDocuments({age}) // age:age
    return count
}

updateAgeAndCount('6105ab9efaede43c3fc5ae37', 2).then((result) => {
    console.log('count :',result)
}).catch((e) => {
    console.log(e)
})









// async/ await
// çoklu fonksiyon kullanımı daha kolay
// async işlemleri sync muş gibi sıralayıp yapabiliyoruz