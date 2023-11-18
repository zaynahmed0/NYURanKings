const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./models/User');
require('./models/Professor');
require('./models/Vote');
require('./config/passport')(passport); // Ensure to have a passport configuration file

const app = express();

app.use(express.json());
app.use(passport.initialize());

// Database connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/nyuVoting', { useNewUrlParser: true, useUnifiedTopology: true });

// Registration route
app.post('/register', /* Registration logic using passportLocalMongoose */);

// Login route
app.post('/login', /* Login logic using passportLocalMongoose */);

// Submit vote route
app.post('/api/submitVote', passport.authenticate('jwt', { session: false }), /* Vote submission logic */);

// Leaderboard route
app.get('/api/leaderboard', /* Leaderboard fetching logic */);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Path: Back-End/server.js
