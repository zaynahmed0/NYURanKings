const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    favoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' },
    leastFavoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }
});

module.exports = mongoose.model('Vote', VoteSchema);
