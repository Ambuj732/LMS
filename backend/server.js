const express = require('express');
const db = require('./connection/connection.js');
const path = require('path');
const bodyParser = require("body-parser");

//intializing express.js
const app = express();


//middlewares
// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());


//app port
app.listen(3000, () => {
    console.log('listening on port 3000.......');
})


//routes
// app.use('/', require('./routes/routes'));
app.use('/user', require('./routes/user'));

