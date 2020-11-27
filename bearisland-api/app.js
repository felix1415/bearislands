var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var csrfTokens = require('csrf')
const config = require('../../config');

// const http = require('http');
// const https = require('https');
// const fs = require('fs');

const frontendAppBuild = "/../bearisland-front/build";

var allowedOrigins = ['http://localhost:9000',
                      'http://bearislands.com',
                      'https://bearislands.com'];

// let tempCredentials;
// if(config.PRODUCTION)
// {
//   const privateKey = fs.readFileSync('/etc/letsencrypt/live/' + config.websiteName + '/privkey.pem', 'utf8');
//   const certificate = fs.readFileSync('/etc/letsencrypt/live/bearislands.com/cert.pem', 'utf8');
//   const ca = fs.readFileSync('/etc/letsencrypt/live/bearislands.com/chain.pem', 'utf8');

//   tempCredentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
//   };
// }

// const credentials = tempCredentials;

var FusionAuth = require('@fusionauth/typescript-client');
const client = new FusionAuth.FusionAuthClient(
    config.apiKey,
    config.fusionAuthServer
);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var contactRouter = require('./routes/contact');

var app = express();

app.use(express.static(path.join(__dirname, frontendAppBuild)));

const csrfProtection = csrfTokens({
  cookie: true
});

// view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      console.log(msg + " " + origin);
      return callback(new Error(msg), false);
    }
    console.log("Success with " + origin);
    return callback(null, true);

  },
  credentials: true
}));

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/contact', contactRouter);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+frontendAppBuild+'/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//disable caching
app.disable('etag');  //app.set('etag', false); // turn off

app.use((req, res) => {
  res.send('Hello there !');
});

// Starting both http & https servers
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(config.httpServerPort, () => {
//   console.log('HTTP Server running on port ' + config.httpServerPort);
// });

// httpsServer.listen(config.httpsServerPort, () => {
//   console.log('HTTPS Server running on port ' + config.httpsServerPort);
// });

app.listen(config.serverPort, () => console.log(`bearislands express app listening on port ${config.serverPort}.`));

module.exports = app;
