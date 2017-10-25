const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
	score: Number,
	name: String,
	date: String
});

module.exports = mongoose.model('Score', ScoreSchema);
