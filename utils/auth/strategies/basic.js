const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('boom');
const bcrypt = require('bcrypt');

const MongoLib = require('../../../lib/mongo');

passport.use(
  new BasicStrategy(async (username, password, cb) => {
    const mongoDb = new MongoLib();

    try {
      const [user] = await mongoDb.getAll('users', { username });

      if (!user) {
        return cb(boom.unauthorized(), null);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), null);
      }

      return cb(null, user);

    } catch (error) {
      return cb(error);
    }
  })
);