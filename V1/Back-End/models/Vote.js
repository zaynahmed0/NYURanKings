const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
    leastFavoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true }
});

// Enhanced static method with error handling for vote calculation
voteSchema.statics.calculateVotes = async function(professorId) {
    try {
        const positiveVotesCount = await this.countDocuments({ favoriteProfessor: professorId });
        const negativeVotesCount = await this.countDocuments({ leastFavoriteProfessor: professorId });
        return { positiveVotesCount, negativeVotesCount };
    } catch (error) {
        console.error('Error calculating votes for professor:', error);
        throw error;
    }
};

module.exports = mongoose.model('Vote', voteSchema);
// Path: Back-End/models/Vote.js