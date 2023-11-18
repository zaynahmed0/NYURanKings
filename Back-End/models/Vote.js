const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
    leastFavoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true }
});

// Static method to calculate vote results for a professor
voteSchema.statics.calculateVotes = async function(professorId) {
    const positiveVotesCount = await this.countDocuments({ favoriteProfessor: professorId });
    const negativeVotesCount = await this.countDocuments({ leastFavoriteProfessor: professorId });
    return { positiveVotesCount, negativeVotesCount };
};

module.exports = mongoose.model('Vote', voteSchema);
