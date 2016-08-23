"use strict";

const User = require("./models/user_model");

const object = {};

module.exports = 


function onRegister(data, cb){
    console.log("registering user: " + data.username);
    const user = new User({
        username : data.username,
        password : data.password
    });
    
    user.save(function(err){
        if(err){
            console.log("failed to register user: " + data.username);
            return cb(err.toString());
        }
        console.log("registered user: " + data.username);
        cb();
    });
}

function onLogin(data, cb){
    console.log("logging in: " + data.username);
    User.findOne({username : data.username}, function(err, user){
        if(err){
            console.log("failed to find: " + data.username);
            cb(err.toString()); 
        } 
        
        user.comparePassword(data.password, function(err, isMatch){
            if(err){
                console.log("password didn't match: " + data.username);
                cb(err.toString()); 
            } 
            console.log("user logged in: " + data.username);
            cb();
        });
    });
}