'use strict';
var User = require('./api/users/model');
var passport = require('passport');
let localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use(new localStrategy(function (username, password, done) {
        User.findOne({ userName: username }, function (err, User) {
            if (err) { done(err) }
            else {
                if (User) {
                    var valid = User.comparePassword(password, User.password)
                    if (valid) {
                        done(null, User)
                    }
                    else {
                        done(null, false)
                    }
                } else {
                    done(null, false)
                }
            }
        })
    }))
}