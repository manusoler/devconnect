 const JwtStrategy = require('passport-jwt').Strategy;
 const ExtractJwt = require('passport-jwt').ExtractJwt;
 const mongoose = require('mongoose');

 const User = mongoose.model('users');

 const opts = {};
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
 opts.secretOrKey = require('../config/keys').jwtKey;

 module.exports = passport => {
     passport.use(new JwtStrategy(opts, (payload, done) => {
         User.findById(payload.id)
             .then(user => {
                 if (user) {
                     done(null, user);
                 } else {
                     done(null, false);
                 }
             }).catch((err) => console.log(err));
     }));
 };