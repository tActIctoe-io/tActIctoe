const passport = require('passport');
const db = require('../models');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) { // TODO: think about just done(null, user.id) then deserialize using id
  console.log('serialising user', user)
  if (user) done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  console.log('deserializing id', id);
  done(null, true);
});

passport.use(new LocalStrategy(
  async function verify(email, password, done) {
    const user = await db.Users.findOne({where: {email}});
    if (user === null) return done('no such user', false)
    const match = await bcrypt.compare(password, user.password);
    if (match) { // TODO: query database
      return done(null, {id: user.id, email, firstName: user.firstName, lastName: user.lastName});
    } else {
      return done('unauthorised access', false)
    }
  }
))

const auth = () => {
  return (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) res.status(400).json({"statusCode": 200, "message": error});
      req.login(user, function(error) {
        if (error) return next(error);
        console.log(user);
        next();
      })
    })(req, res, next);
  }
}

const isLoggedIn = (req, res, next) => {
  console.log(req)
  if(req.isAuthenticated()){
      return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

module.exports = { passport, auth, isLoggedIn }