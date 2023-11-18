const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
    name: String,
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Professor', ProfessorSchema);
//path: Back-End/models/Professor.js
