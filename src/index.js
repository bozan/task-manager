const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // automatically parse incoming JSONs

app.post('/users', (req, res) => {

    const new_user = new User(req.body)
    new_user.save().then(() => {
        res.send(new_user)
    }).catch((e) => {
        res.statsu(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

