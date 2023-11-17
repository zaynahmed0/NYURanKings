const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const Professor = require('./models/Professor');
const Vote = require('./models/Vote');
require('./config/passport')(passport);

mongoose.connect('mongodb://localhost/university_voting', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication Routes...
// Voting Routes...
// Leaderboard Route...

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
