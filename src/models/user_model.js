const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema({
    username : {type : String, required : true, index : {unique : true}},
    password : {type : String, required : true}
});

userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next();
    
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        
        bcrypt.hash(this.password, salt, function(err, hash){
            if(err) return next(err);
            
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("user", userSchema);