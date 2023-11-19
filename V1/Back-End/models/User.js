const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    voted: { type: Boolean, default: false }
});

// Using email as the username field for passport-local
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// Enhanced method to mark user as voted with error handling
userSchema.methods.markVoted = async function() {
    try {
        this.voted = true;
        await this.save();
    } catch (error) {
        console.error('Error marking user as voted:', error);
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);
// Path: Back-End/models/User.js