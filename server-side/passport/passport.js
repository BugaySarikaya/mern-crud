const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('../models/user-model')
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        console.log('test', opts)
        console.log('test2', jwt_payload)
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.error(err))
    }));
}