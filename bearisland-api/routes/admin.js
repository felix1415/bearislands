var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const config = require('../config');
const auth = require('./auth');

var FusionAuth = require('@fusionauth/typescript-client');

const topology = {useUnifiedTopology: true};
const debug = true;

const client = new FusionAuth.FusionAuthClient(
    config.apiKey,   //better put this into a config
    'http://localhost:9011'
);

const MongoClient = require('mongodb').MongoClient

const MAXAGE = 2592000000;

router.use(cookieParser());
router.use('/*', (req, res, next) => {
	validateAdmin(req, res, next);
});
router.use('/*', (req, res, next) => {
    refresh(req, res, next);
});

router.post("/counters", function(req, res) {
    var query = { counterName: req.body.counterName };
    var newCounts = { $inc: { count: 1 }}
    var options = {upsert: true}

    MongoClient.connect(config.mongoInstance, topology, function(err, db) {
        if (err) throw err;
        var dbo = db.db(config.mongoDatabase);
        dbo.collection("counters").updateOne(query, newValues, options, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

    res.send("updated counter");
});

router.get('/getAllConversations', function(req, res) {
    // const uuid = req.query.uuid;
    console.log("trying for messsages from conversation ");
    try
    {
        MongoClient.connect(config.mongoInstance, topology, function(err, db) {
            if (err) throw err;
            var dbo = db.db(config.mongoDatabase);
          dbo.collection("conversations").find().toArray(function(err, result) {
            if (err) throw err;
            console.log("documents:" + JSON.stringify(result, null, 4));
            res.send(result);
            db.close();
          });
        });
    }
    catch(err)
    {
        DEBUG_LOG("ERROR: " + err.message);
    }
});

router.get("/getAllArchivedConversations", function(req, res) {
    DEBUG_LOG("getting all conversations ");
    try
    {
        MongoClient.connect(config.mongoInstance, topology, function(err, db) {
            if (err) throw err;
            var dbo = db.db(config.mongoDatabase);
          dbo.collection("conversations").find({archived: true}).toArray(function(err, result) {
            if (err) throw err;
            console.log("1 document (" + result);
            res.send(result);
            db.close();
          });
        });
    }
    catch(err)
    {
        DEBUG_LOG("ERROR: " + err.message);
    }
});

// router.get("/counters")

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

function validateAdmin(req, res, next) {
    DEBUG_LOG("validate admin");
    //this is broken when we try to validate the JWT- why? is it becuase it comes from the cookie?
    if (!req.cookies.user) {
        DEBUG_LOG("user is forbidden");
    	forbidden(req, res);
    } 
    else 
    {
    	DEBUG_LOG("about to check if admin is ok");
    	var admin = false;
        DEBUG_LOG(req.cookies.token);
    	let promise = client.validateJWT(req.cookies.token)
	    	.then(function(clientResponse) {
	    			for(var role of clientResponse.response.jwt.roles) 
	    			{
	    				DEBUG_LOG("checking if role " + role + " is allowed access");
						if(role.toUpperCase().includes('MOD') )
						{
							DEBUG_LOG("user " + req.cookies.user.email + " is admin");
							next();
							return;
						}
					}
					DEBUG_LOG(req.cookies.user.id + " is not admin, returning forbidden");
					forbidden(req, res);
					return;
            })
    		.catch(function(error) {
                console.log("Something bad happened - check")
                console.log("ERROR: ", JSON.stringify(error, null, 8));
                refresh(req, res, next);
            });
    }
}

function refresh(req, res, next)
{
    DEBUG_LOG("about to refreshToken");
    if (req.cookies.user && req.cookies.token && req.cookies.refreshToken)
    {
        const obj = {
            'refreshToken': req.cookies.refreshToken
        };
        DEBUG_LOG("old: req.cookies.refreshToken " + req.cookies.refreshToken);
        client.exchangeRefreshTokenForJWT(obj)
            .then(function(clientResponse)
            {
                DEBUG_LOG("response from fusionauth: ",JSON.stringify(clientResponse, null, 8));
                res.cookie('token', clientResponse.response.token, { httpOnly: true, maxAge: MAXAGE});
                res.cookie('refreshToken', clientResponse.response.refreshToken, { httpOnly: true, maxAge: MAXAGE});
                res.cookie('user', req.cookies.user, { httpOnly: true, maxAge: MAXAGE});
                next();
            })
            .catch(function(error) {
                console.log("refresh ERROR: ", JSON.stringify(error, null, 4));
                forbidden(req, res);
            });
        return;
    }
    else
    {
        forbidden(req, res);
    }
}

function forbidden(req, res)
{
    DEBUG_LOG("forbidden");
	res.send("403forbidden");
}

function DEBUG_LOG(message)
{
	if(debug)
	{
		// Date();
		console.log("Debuglog : " + message)
	}
}


module.exports = router;