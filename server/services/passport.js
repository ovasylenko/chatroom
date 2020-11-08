import passportJWT from 'passport-jwt'
import User from '../model/User.model'
import config from '../config'

const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.uid)
    .then((user = null) => {
      done(null, user)
    })
    .catch((err) => {
      done(err, null)
    })
})

export default jwtStrategy
