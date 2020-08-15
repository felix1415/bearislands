var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');

var FusionAuth = require('@fusionauth/typescript-client');

const topology = {useUnifiedTopology: true};

const client = new FusionAuth.FusionAuthClient(
    config.apiKey,   //better put this into a config
    'http://localhost:9011'
);

const MongoClient = require('mongodb').MongoClient

router.use(cookieParser());

router.get('/', function(req, res) {
    res.send('Hello World from contact!');
});

router.post('/sendMessage', function(req, res) {
    const messagePayload = {
        '_id': req.body.uuid,
        'email': req.body.email,
        'subject': req.body.subject,
        'message': req.body.message
    };
    console.log(contactForm);

    MongoClient.connect(config.mongoInstance, topology, function(err, db) {
          if (err) throw err;
      var dbo = db.db(config.mongoDatabase);
      dbo.collection("messages").insertOne(contactForm, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    })

    res.send("stored");
});

router.get('/getAllConversations', function(req, res) {

    MongoClient.connect(config.mongoInstance, topology, function(err, db) {
      if (err) throw err;
      var dbo = db.db(config.mongoDatabase);
      dbo.collection("conversations").find().toArray(function(err, res) {
        if (err) throw err;
        console.log("1 document (" + result);
        res.send(result);
        db.close();
      });
    });
});

router.get('/getAllMessages', function(req, res) {
    const uuid = req.query.uuid;
    console.log("trying for messages from conversation " + uuid);
    MongoClient.connect(config.mongoInstance, topology, function(err, db) {
      if (err) throw err;
      var dbo = db.db(config.mongoDatabase);
      dbo.collection(uuid).find().toArray(function(err, result) {
        if (err) throw err;
        console.log("1 document (" + JSON.stringify(result) + ")");
        res.send(result);
        db.close();
      });
    });

});


// router.get('/getConversation', function(req, res) {
//     console.log(req.query.uuid);

//     MongoClient.connect(config.mongoInstance, topology, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db(config.mongoDatabase);
//       dbo.collection(req.query.uuid).find({"_id.$oid" : req.query.uuid}, function(err, res) {
//         if (err) throw err;
//         console.log("1 document (" + res);
//         db.close();
//       });
//     });
//     res.send('send');
// });

router.post('/initialMessage', function(req, res) {
    const newUuid = uuidv4();
    const contactForm = {
        '_id': newUuid,
        'email': req.body.email,
        'subject': req.body.subject,
        'message': req.body.message
    };

    const date = new Date();
    const message = {
        '_id': newUuid,
        'email': req.body.email,
        'date': date,
        'message': req.body.message
    };
    console.log(contactForm);
    console.log(message);

    MongoClient.connect(config.mongoInstance, function(err, db) {
          if (err) throw err;
      var dbo = db.db(config.mongoDatabase);
      dbo.collection("conversations").insertOne(contactForm, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted into conversations (" + message._id + ")");
      });
      dbo.collection(contactForm._id).insertOne(message, function(err, res) {
        if (err) throw err;
        console.log("1 document (" + contactForm._id + ") inserted into messages of conversation " + message._id);
      });
    });

    res.send("stored");
});

router.post('/newMessage', function(req, res) {
    const convoUuid = req.body.uuid;
    const newUuid = uuidv4();
    const date = new Date();
    const message = {
        '_id': newUuid,
        'email': req.body.email,
        'date': date,
        'message': req.body.message
    };

    console.log("convo id: " + convoUuid);

    console.log("got message: " + JSON.stringify(message));

    MongoClient.connect(config.mongoInstance, topology, function(err, db) {
          if (err) throw err;
      var dbo = db.db(config.mongoDatabase);
      dbo.collection(convoUuid).insertOne(message, function(err, res) {
        if (err) throw err;
        console.log("1 document (" + message._id + ") inserted into messages of conversation " + convoUuid);
        db.close();
      });
    });

    res.send("stored");
});

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


router.get('/profile', function(req, res) {
        res.send("Profile");
});

module.exports = router;