var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const config = require('../../config');

var FusionAuth = require('@fusionauth/typescript-client');

const client = new FusionAuth.FusionAuthClient(
    config.apiKey,
    config.fusionAuthServer
);

router.use(cookieParser());

router.get('/invalidateCookies', function(req, res) {
    invalidateCookies(req, res, false);
});

router.get('/logout', function(req, res) {
    invalidateCookies(req, res, false);
});

router.get('/logoutall', function(req, res) {
    invalidateCookies(req, res, true);
});

// router.get('/getApps', function(req, res) {
//     const obj = {
//         'tenantId': config.tenantId,
//         'applicationId': config.applicationId
//     };
//     client.retrieveApplication(obj)
//     .then(function(clientResponse) {
//         console.log("response from fusionauth: ",JSON.stringify(clientResponse, null, 8));
//         res.send("success");
//     })
//     .catch(function(error) {
//         console.log("ERROR: ", JSON.stringify(error, null, 8))
//         res.statusCode = error.statusCode;
//         res.statusMessage = "Login failed";
//         res.send(JSON.stringify(clientResponse, null, 8));
//     });
// });

router.post('/login', function(req, res) {
    if (req.cookies.user) {
        res.send("already logged in");
    } else {
        const obj = {
            'loginId': req.body.email,
            'password': req.body.password,
            'applicationId': config.applicationId
        };
        // console.log("obj: " + JSON.stringify(obj)); - email and password
        client.login(obj)
            .then(function(clientResponse) {
                console.log("response from fusionauth: ",JSON.stringify(clientResponse, null, 8));
                console.log("response from fusionauth: ",JSON.stringify(clientResponse.statusCode, null, 8));

                res.cookie('token', clientResponse.response.token, { httpOnly: true, maxAge: 2592000, overwrite: true});
                res.cookie('refreshToken', clientResponse.response.refreshToken, { httpOnly: true, maxAge: 2592000, overwrite: true});
                res.cookie('user', clientResponse.response.user, { httpOnly: true, maxAge: 2592000, overwrite: true});
                res.send(clientResponse.response.user.username);
            })
            .catch(function(error) {
                console.log("ERROR: ", JSON.stringify(error, null, 8))
                res.statusCode = error.statusCode;
                res.statusMessage = "Login failed";
                res.send("denied");
            });

    }
});

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

function invalidateCookies(req, res, all)
{
    client.logout(all, req.cookies.refreshToken);
    //destroy all cookies?
    res.cookie('token', '', {maxAge: 0});
    res.cookie('refreshToken', '', {maxAge: 0});
    res.cookie('user', '',{maxAge: 0});
    // res.clearCookie('userId');
    res.send("Successfully invalidateCookies (using refreshToken)");

}

module.exports = router;