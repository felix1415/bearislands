var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config');
const auth = require('./auth');
var FusionAuth = require('@fusionauth/typescript-client');

const topology = {useUnifiedTopology: true};

debug = true;

const client = new FusionAuth.FusionAuthClient(
    config.apiKey,   //better put this into a config
    config.fusionAuthServer
);

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

router.get('/getAllConversations', function(req, res) {
    // const uuid = req.query.uuid;
    console.log("trying for messsages from conversation ");
    // MongoClient.connect(config.mongoInstance, topology, function(err, db) {
    //   if (err) throw err;
    //   var dbo = db.db(config.mongoDatabase);
    //   dbo.collection(uuid).find().toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log("1 document (" + JSON.stringify(result) + ")");
    //     res.send(result);
    //     db.close();
    //   });
    // });

});

router.get("/getAllArchivedConversations", function(req, res) {
    DEBUG_LOG("getting all conversations ");
    MongoClient.connect(config.mongoInstance, topology, function(err, db) {
        if (err) throw err;
        var dbo = db.db(config.mongoDatabase);
      dbo.collection("conversations").find({archived: true}).toArray(function(err, res) {
        if (err) throw err;
        console.log("1 document (" + result);
        res.send(result);
        db.close();
      });
    });
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

router.get("/test", function(req, res) {
	// DEBUG_LOG("admin " + req.session.user.id + " has tested they are admin succefully");
	res.send("You are admin.");
});


function validateAdmin(req, res, next) {

    //this is broken when we try to validate the JWT- why? is it becuase it comes from the cookie?
    if (!req.session.user) {
    	forbidden(req, res);
    } 
    else 
    {
    	DEBUG_LOG("about to check if admin");
    	var admin = false;
        DEBUG_LOG(req.session.token);
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