const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./models/User');
require('./models/Professor');
require('./models/Vote');
require('./config/passport')(passport);

const app = express();

// Middlewares for body parsing, authentication, etc.
app.use(express.json());
app.use(passport.initialize());

// User registration route
app.post('/register', (req, res) => {
    // Registration logic here
});

// User login route
app.post('/login', (req, res) => {
    // Login logic here
});

// Submit vote route
app.post('/api/submitVote', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Vote submission logic here
});

// Fetch leaderboard route
app.get('/api/leaderboard', (req, res) => {
    // Leaderboard fetching logic here
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//path: Back-End/server.js
