const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/User');
const Professor = require('./models/Professor');
const Vote = require('./models/Vote');

const app = express();

// Database connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/nyuVoting', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'nyu secret', resave: false, saveUninitialized: true }));
app.use(express.static('public'));

// User registration route
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send('Error in registration');
    }
});

// User login route
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && user.password === req.body.password) {
            req.session.user = user;
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error in login');
    }
});

// Vote submission route
app.post('/api/submitVote', async (req, res) => {
    if (req.session.user) {
        try {
            const newVote = new Vote({ userId: req.session.user._id, ...req.body });
            await newVote.save();
            res.status(201).send('Vote submitted successfully');
        } catch (error) {
            console.error('Vote submission error:', error);
            res.status(400).send('Error in submitting vote');
        }
    } else {
        res.status(403).send('User not authenticated');
    }
});

// Leaderboard retrieval route
app.get('/api/leaderboard', async (req, res) => {
    try {
        const votes = await Vote.aggregate([
            { $group: { _id: "$professorId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json(votes);
    } catch (error) {
        console.error('Leaderboard retrieval error:', error);
        res.status(500).send('Error retrieving leaderboard');
    }
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Path: Front-end/models/User.js