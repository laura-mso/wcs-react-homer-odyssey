var express = require('express');
var router = express.Router();
const connection = require('../../helpers/db');

router.post('/signup', function(req, res, next) {
  const newuser = req.body;
  connection.query('INSERT INTO users SET ?', newuser, (error, result) => {
    if (error) res.status(500).json({flash: error.message});
    else res.status(200).json({flash: 'User has been signed up!'});
    res.end();
  });
});

module.exports = router;
