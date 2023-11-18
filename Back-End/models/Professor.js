const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    positiveVotes: { type: Number, default: 0, min: 0 },
    negativeVotes: { type: Number, default: 0, min: 0 }
});

// Indexing the name field for efficient queries
professorSchema.index({ name: 1 });

module.exports = mongoose.model('Professor', professorSchema);
