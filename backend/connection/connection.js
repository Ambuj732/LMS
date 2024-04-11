const mysql = require('mysql');
const dotenv = require('dotenv');
require('dotenv').config();

// dotenv config
dotenv.config({ path: './.env' });

// db connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
    connectTimeout: 20000 // 20 seconds timeout, adjust as needed
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

