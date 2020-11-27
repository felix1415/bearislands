var express = require('express');
var router = express.Router();

const config = require('../../config');
const MongoClient = require('mongodb').MongoClient
const topology = {useUnifiedTopology: true};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/counters", function(req, res) {
    var query = { counterName: req.body.counterName };
    var newCounts = { $inc: { count: 1 }}
    var options = {upsert: true}

    try
    {
        MongoClient.connect(config.mongoInstance, topology, function(err, db) {
            if (err) throw err;
            var dbo = db.db(config.mongoDatabase);
            dbo.collection("counters").updateOne(query, newCounts, options, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
        res.send("updated counter");
    }
    catch(err)
    {
        console.log("ERROR: " + err.message);
        res.send("error updating counter");
    }

});

module.exports = router;
