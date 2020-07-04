const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

db.select('*').from('users').then(data => {
  console.log(data);
});


const app = express();

// Morgan package, for logging
app.use(morgan('combined'));
// Body parser
app.use(bodyParser.json());
// CORS
app.use(cors());

app.get('/', (req, res) => {res.send(db.users, 'app is working')})
app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister (req, res, db, bcrypt)})
app.get('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileUpdate(req, res, db)})
app.put('/image', auth.requireAuth, (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(3000, ()=> {
  console.log('app is running on port 3000');
});



/* ROUTES to build

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user (updated with ranking)
*/