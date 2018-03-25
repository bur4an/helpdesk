var express = require('express')
var router = express.Router()

router.post('/', function(req, res) {
  res.json([{
  	id: 1,
  	username: req.body.search
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

module.exports = router
