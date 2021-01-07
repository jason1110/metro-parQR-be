const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8080;

const knex = require('knex')
const config = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = knex(config)

const { Model } = require('objection')
Model.knex(database)

const User = require('./models/User')
const Administrator = require('./models/Administrator')
const Meter = require('./models/Meter')
const ParkingSession = require('./models/ParkingSession')
const StateInfo = require('./models/StateInfo');
const { request } = require('express');


app.use( bodyParser.urlencoded({extended: false}) );
app.use( bodyParser.json() );
app.use( cors() );

app.get('/users', (_, response) => {
    User.query()
    .then(users => {
        response.json({ users }) 
    })
    .catch(console.error());
})
app.get('/', (_, response) => {
        response.json('hello') 
    })

app.get('/users/:id', (request, response) => {
    database('users')
        .where({ id: request.params.id })
        .then(users => response.json(users[0]))
        .catch(console.error());
})

app.post('/users', createUser)

app.get('/meters', (_, response) => {
    Meter.query()
    .then(meters => {
        response.json({ meters }) 
    })
    .catch(console.error());
})
app.get('/parkingSessions', (_, response) => {
    ParkingSession.query()
    .then(sessions => {
        response.json({ sessions }) 
    })
    .catch(console.error());
})


app.get('/meters/:id', (request, response) => {
    database('meters')
        .where({ id: request.params.id })
        .then(meters => response.json(meters[0]))
        .catch(console.error());
})

app.post('/parkingSessions', createParkingSession)



function createParkingSession(request, response) {
    console.log(request.body)
    // User.relatedQuery('meters').for(request.body.meter_id)
    database('parkingSessions').insert({user_id: request.body.user_id, meter_id: request.body.meter_id})
    .returning('*')
    .then(console.log)
        // .relate(request.body.user_id)
        // .then(parkingSessions => console.log(parkingSessions))
        // .catch(console.error());
}

app.get('/users', (request, response) => {
    User.query().withGraphFetched("meters")
    .then(users => {
        response.json({users})
    }).catch(error => {
        console.error(error.message)
        response.sendStatus(500)
    })
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
        .catch(console.error());
}
// ***AUTH***
app.post("/login", (request, response) => {
    const { user } = request.body
    User.query()
    .select()
    .where({ email: user.email })
    .first()
    .then( retrievedUser => {
        if (!retrievedUser) throw new Error("invalid credentials username")
        return Promise.all([
            bcrypt.compare(user.password, retrievedUser.password),
            Promise.resolve(retrievedUser)
        ])
    }).then(results => {
        const arePasswordsTheSame = results[0]
        const user = results[1]
        if(!arePasswordsTheSame) throw new Error("invalid credentials")
        
        const payload = { email: user.email}
        // add secret code here

        jwt.sign(payload, secret, (error, token) => {
            if (error) throw new Error("unable to login")
            response.json({ token })
        })

    }).catch(error => {
        response.json(error.message)
    })
})

app.post('/users', (request, response) => {
    const { user } = request.body
    bcrypt.hash(user.password, 12)
        .then(hashedPassword => {
            return User.query()
            .insert({
                id: user.id,
                email: user.email,
                password: hashedPassword
                }).returning("*")
        })
        .then (users => {
            const showUser = users
            response.json({ user: showUser })
        }).catch(error => {
            response.json({error: error.message})
        })
})

app.get("/welcome", authenticate, (request, response) => {
response.json({ message: `${request.user.email} Successfully logged in`})
})

function authenticate(request, response, next){
    const authHeader = request.get("Authorization")
    const token = authHeader.split(" ")[1]
    //add secret code here
    jwt.verify(token, secret, (error, payload) => {
        if (error) response.json({ error: error.message })

        User.query()
        .select()
        .where({ email: payload.email })
        .first()
        .then(user => {
            request.user = user
            next()
        }).catch(error => {
        response.json({ error: error.message})
        })
    })
}

// app.patch

// app.delete


app.listen(port, ()=> console.log(`listening on ${port}`))
