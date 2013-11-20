var mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
        _id: {type: String, unique: true},
        name: String,
        email: String,
        full_user : String,
        miniuser: Boolean,
        type: String,
        password: {type: String},
        invites: {type: Array, default: []},
        username: {type:String, unique:true}
	});

UserSchema.pre('save', function(next) {
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

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                if(err) return cb(err);
                cb(null, isMatch);
        });
};
module.exports = UserSchema;