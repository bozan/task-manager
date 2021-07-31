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

    // FETCH ONE FIELD FROM DATABASE
    // db.collection('users').findOne({name: 'Beyza', age: 21, _id: new ObjectID("61046335254aad302b3ef0cd")}, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetch')
    //     }

    //     console.log(user)
    // })
    // FETCH MULTIPLE FIELDS FROM DATABASE
    // db.collection('users').find({age: 21}).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({age: 21}).count((error, count) => {
    //     console.log(count)
    // })

    db.collection('tasks').findOne({_id: new ObjectID("6104652afd41ad3047524222")}, (error, task) => {
        if (error) {
            return console.log('unable to fetch')
        }
        console.log(task)
    })
    db.collection('tasks').find({completed: false }).toArray((error, my_tasks) => {
        console.log(my_tasks)
    })

})
