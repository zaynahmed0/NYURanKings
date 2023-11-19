const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./models/User');
require('./models/Professor');
require('./models/Vote');
require('./config/passport')(passport); // Passport configuration

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Database connection
mongoose.connect('mongodb://localhost:27017/nyuVoting', { useNewUrlParser: true, useUnifiedTopology: true });

// Registration route
app.post('/register', /* Implement registration logic */);

// Login route
app.post('/login', /* Implement login logic */);

// Submit vote route
app.post('/api/submitVote', passport.authenticate('jwt', { session: false }), /* Implement vote submission logic */);

// Leaderboard route
app.get('/api/leaderboard', /* Implement leaderboard fetching logic */);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Path: Back-End/server.js
