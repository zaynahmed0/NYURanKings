const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
    leastFavoriteProfessor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true }
});

module.exports = mongoose.model('Vote', voteSchema);
