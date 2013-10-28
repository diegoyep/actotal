var mongoose = require('mongoose');
var shortId = require('shortid');

shortId.seed(2930923);

var MiniUseSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	invites: {type: Array, default:[]},
	_id: {type: String, unique: true, default: shortId.generate() }
})

module.exports = MiniUseSchema;