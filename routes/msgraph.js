const express = require('express');
const router = express.Router();

const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const uuid = require('uuid');
const msgraph = require('./graphHelper');
const creds = require('./config')

const callback = (iss, sub, profile, accessToken, refreshToken, done) => {
  done(null, {
    profile,
    accessToken,
    refreshToken
  });
};

passport.use(new OIDCStrategy(creds, callback));

const users = {};
passport.serializeUser((user, done) => {
  const id = uuid.v4();
  users[id] = user;
  done(null, id);
});
passport.deserializeUser((id, done) => {
  const user = users[id];
  done(null, user);
});

router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/msgraph/token');
  } else {
      res.render('index')
  }
});

router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/msgraph/token');
  } else {
      msgraph.setPassword(req.session.token, req.body.upn, req.body.password, function(err, result){

        res.send(result.body)

        //Destroy the session / token since the job is done
        req.session.destroy(() => {
          req.logOut();
          res.clearCookie('graphNodeCookie');
        });
      })
  }
});

//GET request on /msgraph
router.get('/token',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      //Do something here since you have the token now

      req.session.token = req.user.accessToken;
      res.redirect('/msgraph')

    }
);

// helpers
function hasAccessTokenExpired(e) {
  let expired;
  if (!e.innerError) {
    expired = false;
  } else {
    expired = e.forbidden &&
      e.message === 'InvalidAuthenticationToken' &&
      e.response.error.message === 'Access token has expired.';
  }
  return expired;
}

/**
 *
 * @param {*} e
 * @param {*} res
 */
function renderError(e, res) {
  e.innerError = (e.response) ? e.response.text : '';
  res.render('error', {
    error: e
  });
}

module.exports = router
