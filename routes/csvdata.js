var express = require('express')
var router = express.Router()

var fs = require('fs');
var csv = require("fast-csv");
var path = require('path')

router.post('/', function(req, res) {
  res.header('Access-Control-Allow-Origin','*')
  var items = [];
  var index = 0;
  var stream = fs.createReadStream(path.resolve(__dirname,'../files/STDPRICE_FULL.TXT'));
  csv
   .fromStream(stream, {
     headers: true
   })
   .on("data", function(data) {
     if(data["Vendor Name"] == req.body.search){
       items[index] = data
       index++
     }
   })
   .on("end", function() {
     res.send(items)
   });
});

module.exports = router
