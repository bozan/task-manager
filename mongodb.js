// CRUD operations  --> create, read update, delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// instead of code above, we can also do like below:

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.id) // it gives binary id information
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect database!')
    }
    // console.log('Connected correctly!')

    const db = client.db(databaseName)

    // INSERT ONE USER 
    db.collection('users').insertOne({
        _id: id,
        name:'BBA',
        age: 21
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user! ')
        }
        console.log(result.ops)
    })

//     // INSERT MULTIPLE USERS
//     db.collection('users').insertMany([
//         {
//             name: 'Oltan',
//             age: 19
//         },
//         {
//             name: 'Andrew',
//             age: 27
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('Unable to insert users!')
//         }
//         console.log(result.ops)

//     })

    // INSERT MULTIPLE TASKS (CHALLANGE)
//     db.collection('tasks').insertMany([
//         {
//             description: 'my first task',
//             completed: true
//         }, {
//             description: 'my second task',
//             completed: false
//         }, {
//             description: 'third task',
//             completed: false
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('Unable to insert tasks!')
//         }
//         console.log(result.ops)
//     })
})
