const db = require('../connection/connection.js');
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");



express().use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  
express().use(bodyParser.json()); // data of cunstomer handle.


// Controller functions for Admin dashboard

/**
 * Authenticates the user login by checking the email and password provided.
 *
 * If the email or password are missing, it returns an error response with status 400.
 * If there is an error while querying the database, it returns an error response with status 500.
 * If the email does not exist in the database, it returns an error response with status 400.
 * If the password is incorrect, it returns an error response with status 401.
 * If all checks pass, it generates a JWT token, updates the user's login timestamp in the database,
 * sets the token as a cookie, and redirects the user to the admin dashboard with a status 200.
* @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {JSON} - sends a success JSON which redirects the user to the admin dashboard
 * **/

// Controller function for authenticating user login
const authenticateUser = (req, res) => {
  const { email, password } = req.body;

  // Check if email or password are missing
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Query the database to check if the email exists
  db.query('SELECT * FROM CUSTOMERS WHERE EMAIL = ?', [email], (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if the email exists in the database
    if (results.length === 0) {
      return res.status(400).json({ error: 'Email not found.' });
    }

    // Check if the password is correct
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // If all checks pass, return success response
    return res.status(200).json({ message: 'Login successful.' });
  });
};

module.exports = { authenticateUser };
