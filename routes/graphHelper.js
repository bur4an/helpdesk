const request = require('superagent');

/**
 * Generates a GET request the user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {Function} callback
 */
exports.getUsers = function (accessToken, callback) {
  request
   .get('https://graph.microsoft.com/v1.0/users')
   .set('Authorization', 'Bearer ' + accessToken)
   .end((err, res) => {
     callback(err, res);
   });
}

exports.setPassword = function (accessToken, upn, password, callback) {
  request
   .patch('https://graph.microsoft.com/v1.0/users/'+ upn )
   .set('Authorization', 'Bearer ' + accessToken)
   .send({
   "passwordProfile": {
                "forceChangePasswordNextSignIn": false,
                "password": password
            }
    })
   .end((err, res) => {
     callback(err, res);
   });
}
