const express = require('express');
const router = express.Router();
const config = require('../../config');

router.get('/', (req, res) => {
  console.log("redirect!!!! " + config.fusionAuthServer);
  res.redirect(`${config.fusionAuthServer}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code`);
});

module.exports = router;