
var mongoose = require('mongoose');
var PartnerSchema = require('../schemas/partner')

var Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;