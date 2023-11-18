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

// User registration route with NYU email validation
app.post('/register', async (req, res) => {
    try {
        // Validate NYU email address
        const emailRegex = /^[a-zA-Z0-9._%+-]+@nyu\.edu$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).send('Invalid email address. Please use your NYU email.');
        }

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
            // Check if the user has already voted
            const existingVote = await Vote.findOne({ userId: req.session.user._id });
            if (existingVote) {
                return res.status(403).send('You have already voted');
            }

            // Save new vote
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

app.get('/api/professors', async (req, res) => {
    try {
        const professors = await Professor.find({});
        res.json(professors);
    } catch (error) {
        console.error('Fetch professors error:', error);
        res.status(500).send('Error fetching professors');
    }
});

// Leaderboard retrieval route
app.get('/api/leaderboard', async (req, res) => {
    try {
        // Good Teachers Leaderboard
        const goodTeachers = await Vote.aggregate([
            { $match: { voteType: 'good' } },
            { $group: { _id: '$professorId', goodVotes: { $sum: 1 } } },
            { $sort: { goodVotes: -1 } }
        ]);

        // Bad Teachers Leaderboard
        const badTeachers = await Vote.aggregate([
            { $match: { voteType: 'bad' } },
            { $group: { _id: '$professorId', badVotes: { $sum: 1 } } },
            { $sort: { badVotes: -1 } }
        ]);

        // Best to Worst Ratio Leaderboard
        const ratioLeaderboard = await Vote.aggregate([
            { $group: {
                    _id: '$professorId',
                    goodVotes: {
                        $sum: { $cond: [{ $eq: ['$voteType', 'good'] }, 1, 0] }
                    },
                    badVotes: {
                        $sum: { $cond: [{ $eq: ['$voteType', 'bad'] }, 1, 0] }
                    }
                }},
            { $addFields: {
                    ratio: {
                        $cond: [{ $eq: ['$badVotes', 0] }, '$goodVotes', { $divide: ['$goodVotes', '$badVotes'] }]
                    }
                }},
            { $sort: { ratio: -1 } }
        ]);

        res.json({ goodTeachers, badTeachers, ratioLeaderboard });
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

// Path: Front-end/app.js