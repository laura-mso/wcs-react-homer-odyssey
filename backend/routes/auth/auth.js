var express = require('express');
var router = express.Router();
const connection = require('../../helpers/db');

router.post('/signup', function(req, res, next) {
  const newuser = req.body;
  connection.query('INSERT INTO users SET ?', newuser, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).end();
    }
    res.end();
  });
});

module.exports = router;
