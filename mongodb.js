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

    
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("61046335254aad302b3ef0cd")
    // }, {
    //     $set: {
    //         name: 'Mike'
    //     }
    // })
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // instead of above, we can use below mostly:
    
    // UPDATE ONE FIELD FROM DATABASE
    db.collection('users').updateOne({
        _id: new ObjectID("61046335254aad302b3ef0cd")
    }, {
        $set: {
            name: 'Mikee'
        },
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    // UPDATE MULTIPLE FIELDS FROM DATABASE
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })

})
