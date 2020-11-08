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
// router.use('/*', (req, res, next) => {
//     refresh(req, res, next);
// });
router.use('/*', (req, res, next) => {
	validateAdmin(req, res, next);
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

function archiveChat(req, res, archive) {
    const uuid = req.body.uuid;
    var filter = { _id: req.body.uuid };
    var query = { $set: {'archive': archive} };
    var options = {upsert: true}

    MongoClient.connect(config.mongoInstance, topology, function(err, db) {
        if (err) throw err;
        var dbo = db.db(config.mongoDatabase);
        dbo.collection("conversations").updateOne(filter, query, function(err, res) {
            if (err) throw err;
            console.log("1 document with UUID " + req.body.uuid + " updated with " + JSON.stringify(query));
            db.close();
        });
    });
    res.send("unarchived");
}

router.post("/archiveChat", function(req, res) {
    archiveChat(req, res, true);
});

router.post("/unArchiveChat", function(req, res) {
    archiveChat(req, res, false);
});

router.post("/removeChat", function(req, res) {
    try
    {
            MongoClient.connect(config.mongoInstance, topology, function(err, db) {
            if (err) throw err;
            var dbo = db.db(config.mongoDatabase);
            dbo.collection(req.body.uuid).deleteOne();
            dbo.collection("conversations").deleteOne({"_id": req.body.uuid}, function(err, res) {
                if (err) throw err;
                console.log("1 document with UUID " + req.body.uuid + " removed from conversations");
            });
          });
          res.send("delete");
    }
    catch(err)
    {
        DEBUG_LOG("ERROR: " + err.message);
        res.send("delete");
    }
});

router.post("/sendReminder", function(req, res) {
    userPromise = getUser(req.body.email);

    userPromise.then(function(clientResponse) {
        const obj =
        {
            'requestData':
            {
                'uuid': req.body.uuid
            },
            'userIds': [
                clientResponse.response.user.id
              ]            
        }
        console.log(JSON.stringify(obj, null, 8));
        console.log("EmailTemplate: " + config.SendReminderToPlayer);

        DEBUG_LOG("user " + clientResponse.response.user.email + " is a user about to recieve an email");
        client.sendEmail(config.SendReminderToPlayer, obj)
        .then(function(clientResponse) {
                console.log("sendEmail responseStatus: ",JSON.stringify(clientResponse, null, 8));
                res.send("sent");
        })
        .catch(function(error) {
            console.log("failed to send email via fusionauth");
            console.log("ERROR: ", JSON.stringify(error, null, 8));
            res.status(401).send("error");
            return;
        });

    })
    .catch(function(error) {
        console.log("failed to get user from fusionauth");
        console.log("ERROR: ", JSON.stringify(error, null, 8));
        res.status(401).send("error");
    });

});

function getUser(email)
{
    let returnPromise;
    let promise = client.retrieveUserByEmail(email)
    .then(function(clientResponse) {
            console.log("getUser responseStatus: ",JSON.stringify(clientResponse.statusCode, null, 8));

            return clientResponse;
    })
    .catch(function(error) {
        returnPromise =
        console.log("failed to getUser")
        console.log("ERROR: ", JSON.stringify(error, null, 8));
    });

    return promise;
}

router.get('/getAllConversations', function(req, res) {
    console.log("trying for messsages from conversation ");
    try
    {
        MongoClient.connect(config.mongoInstance, topology, function(err, db) {
            if (err) throw err;
            var dbo = db.db(config.mongoDatabase);
          dbo.collection("conversations").find({archive: false}).toArray(function(err, result) {
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
        res.send("error");
    }
});

router.get("/getAllArchivedConversations", function(req, res) {
    DEBUG_LOG("getting all conversations ");
    try
    {
        MongoClient.connect(config.mongoInstance, topology, function(err, db) {
            if (err) throw err;
            var dbo = db.db(config.mongoDatabase);
          dbo.collection("conversations").find({archive: true}).toArray(function(err, result) {
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
        res.send("error");
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
// 		console.log("no");
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
							DEBUG_LOG("user " + req.cookies.user.id + " is admin");
                            refresh(req, res, next);
                            return;
							// next();
						}

					}
					DEBUG_LOG(req.cookies.user.id + " is not admin, returning forbidden");
					forbidden(req, res);
            })
    		.catch(function(error) {
                console.log("vaild to validate jwt")
                console.log("ERROR: ", JSON.stringify(error, null, 8));
                refresh(req, res, next);
                // res.status(401).send("error");
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
                DEBUG_LOG("response from fusionauth: ",JSON.stringify(clientResponse.statusCode, null, 8));
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
	res.status(403).send("403forbidden");
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