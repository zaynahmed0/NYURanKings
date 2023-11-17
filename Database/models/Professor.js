const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Professor', professorSchema);
