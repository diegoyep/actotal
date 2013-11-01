var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	slug: { type: String, unique: true},
	content: String,
	author: String,
	data: {type: String, default: Date.now()}
});

module.exports = PostSchema;
