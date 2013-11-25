var mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        SALT_WORK_FACTOR = 10;

var PartnerSchema = new mongoose.Schema({
        _id:{type: String, unique: true},
        name: String,
        email: String,
        waitlist: {type: Array, default: []},
        refsales: {type: Array, default: []},
        clicks: Number,
        reflink: String,
        refcode: {type:String, unique:true},
        place: Boolean,
        payPerClick: Number,
        payPerRef: Number,
        promoter: Boolean,
        type: String,
        contact: {
                address: String,
                phone: {type: Array, default: []}
        },
        password: {type: String},
        username: {type:String, unique:true}
});

PartnerSchema.pre('save', function(next) {
        var user = this;

        if(!user.isModified('password')) return next();

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if(err) return next(err);

                bcrypt.hash(user.password, salt, function(err, hash) {
                        if(err) return next(err);
                        user.password = hash;
                        next();
                });
        });
});

PartnerSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                if(err) return cb(err);
                cb(null, isMatch);
        });
};
module.exports = PartnerSchema;