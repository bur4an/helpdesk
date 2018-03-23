const express = require('express')
const app = express()
const path = require('path')
const users = require('./routes/users.js')

app.use(express.static('./public'))
app.use('/users', users)


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
