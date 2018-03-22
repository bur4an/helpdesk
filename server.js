const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('./public'));

app.get('/users', function(req, res, next) {
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
