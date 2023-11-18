const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    positiveVotes: { type: Number, default: 0 },
    negativeVotes: { type: Number, default: 0 }
});

// Combined method for vote updating
professorSchema.methods.incrementVotes = function(isPositiveVote) {
    if (isPositiveVote) {
        this.positiveVotes += 1;
    } else {
        this.negativeVotes += 1;
    }
    return this.save();
};

// Static method to get leaderboard
professorSchema.statics.getLeaderboard = function() {
    return this.aggregate([
        {
            $project: {
                name: 1,
                totalVotes: { $subtract: ["$positiveVotes", "$negativeVotes"] }
            }
        },
        { $sort: { totalVotes: -1 } }
    ]);
};

module.exports = mongoose.model('Professor', professorSchema);
// Path: Back-End/models/Professor.js