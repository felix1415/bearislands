var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config');
const auth = require('./auth');
var FusionAuth = require('@fusionauth/typescript-client');

debug = false;

const client = new FusionAuth.FusionAuthClient(
    config.apiKey,   //better put this into a config
    'http://localhost:9011'
);

router.use('/*', (req, res, next) => {
	validateAdmin(req, res, next);
});

// function landingPage(isAdmin, req, res)
// {
// 	//send stuff for landing page
// 	console.log("admin is " + adminBool + " in second then");
// 	if(adminBool)
// 	{
// 		console.log("admin about to do admin things");
// 		res.send("That should work");
// 	}
// 	else
// 	{
// 		console.log("fuck no");
// 	}
// }

router.get("/test", function(req, res) {
	DEBUG_LOG("admin " + req.session.user.id + " has tested they are admin succefully");
	res.send("You are admin.");
	// validateAdmin(req, res, landingPage);
});


function validateAdmin(req, res, next) {
    if (!req.session.user) {
    	forbidden(req, res);
    } 
    else 
    {
    	DEBUG_LOG("about to check if admin");
    	var admin = false;
    	let promise = client.validateJWT(req.session.token)
	    	.then(function(clientResponse) {
	    			for(var role of clientResponse.response.jwt.roles) 
	    			{
	    				DEBUG_LOG("Checking if role " + role + " is allowed access");
						if(role.toUpperCase().includes('MOD') )
						{
							DEBUG_LOG(req.session.user.id + " is admin");
							next();
							return;
						}
					}
					DEBUG_LOG(req.session.user.id + " is not admin, returning forbidden");
					forbidden(req, res);
					return;
	            })
	    		.catch(function(error) {
	                console.log("ERROR: ", JSON.stringify(error, null, 8));
	            });
    }
}

function forbidden(req, res)
{
	res.send("403forbidden");
}

function DEBUG_LOG(message)
{
	if(debug)
	{
		// Date();
		console.log(" : Debuglog : " + message)
	}
}


module.exports = router;