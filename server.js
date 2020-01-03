const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
//const database = require('./database')
const app = express();
const ONE_DAY = 1000 * 60 * 60 * 24

const {
  PORT = 3000,
  SESS_LIFETIME = ONE_DAY,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'magic!',
} = process.env


// const db = database.runDatabase()

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


// Server handlin
 
app.use(allowCrossDomain);
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/pages'));

// Resources
app.get('/', (req, res) => {
  res.sendFile(__dirname + '.ndex.html');
})

app.get('/bio', (req, res) => {
  res.sendFile(__dirname + 'bio.html')
})

app.get('/portfolio', (req, res) => {
  res.sendFile(__dirname + 'portfolio.html')
})

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + 'contact.html')
})

app.get('/resume', (req, res) => {
  res.sendFile(__dirname +'resume.pdf')
})



app.listen(PORT, () => {
    console.log(`App started on PORT ${PORT}`);
});


