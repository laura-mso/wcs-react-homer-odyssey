var express = require('express');
var router = express.Router();
const connection = require('../../helpers/db');
const bcrypt = require('bcrypt');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    function(jwtPayload, cb) {
      return cb(null, jwtPayload);
    },
  ),
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    function(email, password, cb) {
      connection.query(
        'SELECT * from users WHERE email = ?',
        email,
        (error, user) => {
          if (error) {
            return cb(err);
          }
          if (!user[0]) {
            return cb(null, false, {message: 'Incorrect email'});
          }
          if (!bcrypt.compareSync(password, user[0].password)) {
            return cb(null, false, {message: 'Incorrect password.'});
          }
          return cb(null, user);
        },
      );
    },
  ),
);

router.post('/signup', function(req, res, next) {
  const newuser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    lastname: req.body.lastname,
  };
  connection.query('INSERT INTO users SET ?', newuser, (error, result) => {
    if (error) res.status(500).json({flash: error.message});
    else res.status(200).json({flash: 'User has been signed up!'});
    res.end();
  });
});

router.post('/signin', function(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).json({message: info.message});
    console.log(user[0]);
    const token = jwt.sign(
      JSON.parse(JSON.stringify(user[0])),
      'your_jwt_secret',
    );
    return res.json({user, token});
  })(req, res);
});

module.exports = router;
