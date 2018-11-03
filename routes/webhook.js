var express = require('express')
var router = express.Router()



router.post('/', function(req, res){

    console.log(req.body);



})

module.exports = router;

//** AD Commands
/*const ad = new AD({
    url: "ldaps://127.0.0.1",
    user: "DomainAdmin",
    pass: "DomainAdminPassword"
});*/
/*    (async () => {
        try {

            await ad.user().add({
                userName: 'jsmith',
                firstName: 'John',
                lastName: 'Smith',
                location: '/Users/Sales',
                password: 'J@vascr!pt1'
            });
            await ad.group().add('Sales');
            await ad.user('jsmith').addToGroup('Sales');

        } catch(err) {
            // ...

        }
    })();**/

//** For POWERSHELL Commands
/*const shell = require('node-powershell');

let ps = new shell({
  executionPolicy: 'Bypass',
  noProfile: true
});

ps.addCommand('echo node-powershell')
ps.invoke()
.then(output => {
  console.log(output);
})
.catch(err => {
  console.log(err);
  ps.dispose();
});**/
