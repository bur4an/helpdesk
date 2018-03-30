var express = require('express')
var router = express.Router()
var fs = require('fs');
var csv = require("fast-csv");
var ebay = require("ebay-api");
var path = require('path')

router.get('/', function(req, res) {
  var items = [];
  var index = 0;
  var stream = fs.createReadStream(path.resolve(__dirname,'../pricelist/STDPRICE_FULL.TXT'));
  csv
   .fromStream(stream, {
     headers: true
   })
   .on("data", function(data) {
     if(data["Vendor Name"] == "LOGITECH"){
       items[index] = data
       index++
     }
   })
   .on("end", function() {
     res.send(items)
   });
});

module.exports = router
