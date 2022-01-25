import { Strategy, ExtractJwt } from 'passport-jwt'
import { Users }  from '../Models/Users.model.js'
import dotenv from 'dotenv'

dotenv.config()

export const passportStrategy = passport => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = process.env.PASSPORT_SECRET
    
    passport.use(
        new Strategy (opts, (jwt_payload, done) => {
            Users.findOne({email: jwt_payload.email}, (err, user) => {
                if (err) {
                    return done(err, false)
                }
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
        })
    )
}