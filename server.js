const express = require('express');
const redis = require('redis');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')
const mysql = require('mysql');
const async = require('async');
const path = require('path');
const database = require('./database')

const router = express.Router()
const app = express();
const redisStore = require('connect-redis')(session);
const client = redis.createClient()
const ONE_DAY = 1000 * 60 * 60 * 24

const {
  PORT = 3000,
  SESS_LIFETIME = ONE_DAY,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'magic!',
} = process.env
const IN_PROD = NODE_ENV === 'production'

const ACTIONS = {
  signin: 'signin',
  signup: 'signout',
  logout: 'logout',
}
const db = database.runDatabase()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
        // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}


// Helpers
function checkUsername(username) {
  var err = false;
  if (username.length == 0) {
    err = 'No username inputted'
  } else if (username.length > 20) {
    err = 'Username can be at most 20 characters'
  } else if (!username.match(/^[\w]+$/)) {
    err = 'Username must be alphanumeric'
  }
  return err
}

function checkPassword(password) {
  var err = false;
  if (!password || password.length < 6) {
    err = 'Password must be at least 6 characters'
  }
  return err
}

// Server handling
app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260}),
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD,
  },
}))
 
app.use(allowCrossDomain);
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));


// Resources
app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.get('/home', (req, res) => {
  res.sendFile('home.html')
})

app.get('/highscores', (req, res) => {
  res.sendFile('highscores.html')
})

app.get('/statistics', (req, res) => {
  res.sendFile('statistics.html')
})

app.get('/contact', (req, res) => {
  res.sendFile('contact.html')
})



app.listen(PORT, () => {
    console.log(`App started on PORT ${PORT}`);
});


