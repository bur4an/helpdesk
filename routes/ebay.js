var express = require('express')
var router = express.Router()
var ebay = require('ebay-api')

router.post('/', function(req, res) {
  /**
   * example eBay API request to FindingService:findItemsByKeywords
   */
  var items = [];

  var params = {
      keywords: req.body.search,
      sortOrder: 'PricePlusShippingAsc',
      paginationInput:{
              entriesPerPage: '20',
              pageNumber: 1,
                              },
      itemFilter: [{
              name: 'Condition',
              value: '1000'
            }, {
              name: 'LocatedIn',
              value: 'AU'
            }, {
              name: 'ListingType',
              value: 'FixedPrice'
            },
            {
              name: 'HideDuplicateItems',
              value: 'true'
            },
            {
              name: 'ListedIn',
              value: 'EBAY-AU'
            },
            /*{
              name: 'ExcludeSeller',
              value: ['officesupplyaustralia','mobiletechmart']
            },*/
            ]
      };

  ebay.xmlRequest({
      serviceName: 'Finding',
      opType: 'findItemsByKeywords',
      appId: 'AlifiyaV-superpri-PRD-49a67cc35-af93214d',      // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
      params: params,
      parser: ebay.parseResponseJson    // (default)
    },
    // gets all the items together in a merged array
    function itemsCallback(error, itemsResponse) {
      if (error) throw error;

      if (itemsResponse.ack === 'Success' && parseInt(itemsResponse.searchResult.$.count) > 1)
        itemsResponse.searchResult.item.forEach(function(item) {
            ebay.xmlRequest({
                serviceName: 'Shopping',
                opType: 'GetSingleItem',
                appId: 'AlifiyaV-superpri-PRD-49a67cc35-af93214d',
                params: {
                    'ItemID': item.itemId,
                    'IncludeSelector': 'Details,ItemSpecifics',
                }
            }, function(errr, detail) {
                // ...
                if (errr)
                    console.log(errr)
                if (detail.Ack == 'Success') {
                    items.push(detail.Item);
                    if (items.length == itemsResponse.searchResult.item.length)
                      res.send(items);
                }
            });
        });
    }
  );
});

module.exports = router
