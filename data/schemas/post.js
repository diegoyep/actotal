var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
		title: String,
		slug: { type: String, unique: true},
		content: String,
		author: String,
		published: Date
	});


module.exports = PostSchema;
