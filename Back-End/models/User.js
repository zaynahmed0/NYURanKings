const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Email validation
    },
    voted: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// Indexing the email field
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
