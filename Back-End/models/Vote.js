const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    favoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
    leastFavoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
});

voteSchema.index({ user: 1, favoriteProfessor: 1, leastFavoriteProfessor: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
