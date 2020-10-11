const express = require('express');
const { response } = require('express');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
var mysql = require('mysql');
var moment = require('moment');
const register = require('./register');
const signIn = require('./signIn')
const profile = require('./profile')
const image = require('./image')

const mysqldb = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: '3306',
        user: 'jun',
        password: 'junkun',
        database: 'smartbrain',
        insecureAuth: true
    }
})

var con = mysql.createConnection({
    host: "localhost",
    user: "jun",
    password: "junkun",
    database: "smartbrain"
});

con.connect(function (err) {
    if (err) {
        console.log('error');
        throw err
    }
    console.log('connected');
});



app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/', (req, res) => {
    res.json(database.users);
});

app.listen(3000, () => {
    console.log('Server up n runnin..');
})

app.get('/profile/:id', (req, res,mysqldb)=>profile.handleProfile(req,res,mysqldb))

app.put('/image', (req, res,mysqldb) => image.handleImage(req,res,mysqldb,con))

app.post('/signin', (req,res,mysqldb,con)=>signIn.handleSignIn(req,res,mysqldb,bcrypt,con))

app.post('/register', (req, res) => register.handleRegister(req,res,mysqldb,bcrypt,con))


/*
to create new user
CREATE USER 'new_user'@'%' IDENTIFIED WITH mysql_native_password BY '***';
GRANT USAGE ON *.* TO 'new_user'@'%';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON `new_user`.* TO 'new_user'@'%';
FLUSH PRIVILEGES;
*/