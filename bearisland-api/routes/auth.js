var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
const config = require('../config');

var FusionAuth = require('@fusionauth/typescript-client');

const client = new FusionAuth.FusionAuthClient(
    config.apiKey,   //better put this into a config
    'http://localhost:9011'
);

router.use(cookieParser());

router.get('/', function(req, res) {
    res.send('Hello World from auth!');
});

router.get('/invalidateCookies', function(req, res) {
    invalidateCookies(req, res, false);
});

router.get('/logout', function(req, res) {
    invalidateCookies(req, res, false);
});

router.get('/logoutall', function(req, res) {
    invalidateCookies(req, res, true);
    // client.logout(true, req.session.refreshToken);
    // res.cookie('token', {maxAge: 0});
    // res.cookie('refreshToken', {maxAge: 0});
    // res.cookie('user', {maxAge: 0});
    // res.send("Successfully logged out all refreshTokens");
});



router.get('/reqprint', function(req, res) {   
	console.log('email: ', req.cookies.email); 
    console.log('email: ', req.cookies.token); 
    res.send();
});

router.post('/login', function(req, res) {
    if (req.cookies.user) {
        console.log('user: ', req.cookies.user);
    } else {
        const obj = {
            'loginId': req.body.email,
            'password': req.body.password,
            'applicationId': config.applicationId
        };
        console.log("obj: " + JSON.stringify(obj));
        client.login(obj)
            .then(function(clientResponse) {
                // console.log("response from fusionauth: ",JSON.stringify(clientResponse, null, 8));
                console.log("response from fusionauth: ",JSON.stringify(clientResponse.statusCode, null, 8));
                //, secure: process.env.NODE_ENV === 'production'? true: false
                res.cookie('token', clientResponse.response.token, { httpOnly: true, maxAge: 2592000, overwrite: true});
                res.cookie('refreshToken', clientResponse.response.refreshToken, { httpOnly: true, maxAge: 2592000, overwrite: true});
                res.cookie('user', clientResponse.response.user, { httpOnly: true, maxAge: 2592000, overwrite: true});

                // req.session.cookie.maxAge = 5555;

                console.log("Successfully saved cookies : " +  JSON.stringify(req.cookies));
                res.send('success');
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


// router.get('/refresh', function(req, res) {
// 	refresh(req, res);
// });

// function refresh(req, res)
// {
//     console.log("about to refreshToken");
// 	if (req.cookies.user && req.cookies.token && req.cookies.refreshToken)
// 	{
// 	    const obj = {
// 	        'refreshToken': req.cookies.refreshToken
// 	    };
// 		 client.exchangeRefreshTokenForJWT(obj)
// 		 		.then(function(clientResponse)
// 		 		{
// 		 			console.log("response from fusionauth: ",JSON.stringify(clientResponse, null, 8));
//                     res.cookie('token', clientResponse.response.token, { httpOnly: true, maxAge: 2592000});
//                     res.cookie('refreshToken', clientResponse.response.refreshToken, { httpOnly: true, maxAge: 2592000});
//                     res.cookie('user', req.cookies.user, { httpOnly: true, maxAge: 2592000});
// 		 		})
// 		 		.catch(function(error) {
// 	                console.log("ERROR: ", JSON.stringify(error, null, 8))
// 	            });
// 	}
// }

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