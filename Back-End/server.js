const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./models/User');
require('./models/Professor');
require('./models/Vote');
require('./config/passport')(passport);

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.post('/register', /* Registration logic using passportLocalMongoose */);
app.post('/login', /* Login logic using passportLocalMongoose */);

app.post('/api/submitVote', passport.authenticate('jwt', { session: false }), /* Vote submission logic */);
app.get('/api/leaderboard', /* Leaderboard fetching logic */);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Path: Back-End/models/Vote.js