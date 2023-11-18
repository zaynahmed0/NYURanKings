const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    voted: { type: Boolean, default: false }
});

// Using email as the username field for passport-local
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// Method to mark user as voted
userSchema.methods.markVoted = function() {
    this.voted = true;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
//path: Back-End/models/Vote.js
