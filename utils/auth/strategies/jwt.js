const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');

const { config } = require('../../../config');
const MongoLib = require('../../../lib/mongo');

passport.use(
  new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }, async (tokenRequest, cb) => {
    const mongoDb = new MongoLib();

    try {
      const [ user ] = await mongoDb.getAll('users', {
        username: tokenRequest.sub
      });

      if (!user) {
        return cb(boom.unauthorized(), null);
      }

      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  })
);