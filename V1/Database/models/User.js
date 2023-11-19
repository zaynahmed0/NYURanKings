const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    voted: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
// In User.js and Professor.js
schema.index({ email: 1 }); // For User.js
schema.index({ name: 1 }); // For Professor.js
//path: Back-End/models/User.js