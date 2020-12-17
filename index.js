const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 8080;

const knex = require('knex')
const config = require('./knexfile').development
const database = knex(config)

const { Model } = require('objection')
Model.knex(database)

const User = require('./models/User')
const Administrator = require('./models/Administrator')
const Meter = require('./models/Meter')
const ParkingSession = require('./models/ParkingSession')
const StateInfo = require('./models/StateInfo')


app.use( bodyParser.urlencoded({extended: false}) );
app.use( bodyParser.json() );
app.use( cors() );

app.get('/users', (_, response) => {
    User.query()
    .then(users => {
        response.json({ users }) 
    })
})

app.get('/users/:id', (request, response) => {
    database('users')
        .where({ id: request.params.id })
        .then(users => response.json(users[0]))
})

app.post('/users', createUser)


function createUser(request, response) {
    database('users')
        .insert({
            name: request.body.name,
            email: request.body.email,
            driversLicense: request.body.driversLicense,
            licensePlate: request.body.licensePlate,
            password: request.body.password,
            approved: request.body.approved
        })
        .returning(['id', 'name', 'email'])
        .then(users => response.json(users[0]))
}

// app.patch

// app.delete


app.listen(port, ()=> console.log('listening on 8080'))
