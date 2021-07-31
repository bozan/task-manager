// CRUD operations  --> create, read update, delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// instead of code above, we can also do like below:

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect database!')
    }
    // console.log('Connected correctly!')

    const db = client.db(databaseName)

    // DELETE MULTIPLE DATA FROM DATABASE
   db.collection('users').deleteMany({
       age: 21
   }).then((result) => {
       console.log(result)
   }).catch((error) => {
       console.log(error)
   })

    // DELETE ONE DATA FROM DATABASE
    db.collection('tasks').deleteOne({
        description: "my second task"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
