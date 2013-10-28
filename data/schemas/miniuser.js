var mongoose = require('mongoose');


var MiniUseSchema = new mongoose.Schema({
	email: {type: String, unique: true},
	invites: {type: Array, default:[]},
	_id: {type: String, unique: true}
});

module.exports = MiniUseSchema;