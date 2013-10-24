var mongoose = require('mongoose');
var MiniUserSchema = require('../schemas/miniuser');


var MiniUser = mongoose.model('MiniUser', MiniUserSchema);

module.exports = MiniUser; 