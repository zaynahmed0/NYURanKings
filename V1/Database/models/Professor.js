const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Professor', professorSchema);

// In User.js and Professor.js
schema.index({ email: 1 }); // For User.js
schema.index({ name: 1 }); // For Professor.js
//path: Back-End/models/Professor.js
