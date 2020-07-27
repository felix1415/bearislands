var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var csrfTokens = require('csrf')
const config = require('../config'); //local

var allowedOrigins = ['http://localhost:3000',
                      'http://bearislands.com'];

var FusionAuth = require('@fusionauth/typescript-client');
const client = new FusionAuth.FusionAuthClient(
    config.apiKey,   //better put this into a config
    'http://localhost:9011'
);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var contactRouter = require('./routes/contact');

var app = express();

const csrfProtection = csrfTokens({
  cookie: true
});

// app.use(csrfProtection);

// app.get('/csrf-token', (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// configure sessions - DO NOT USE IN PRODUCTION - SEE https://www.npmjs.com/package/express-session
// app.use(session(
//   {
//     secret: '092dbedc-30af-4149-9c61-b578f2c72f59',
//     resave: false,
//     saveUninitialized: false,
//     // cookie: {
//     // //   secure: 'auto',
//     //   httpOnly: true,
//     // //   maxAge: 3600000
//     // }
//   })
// );

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/contact', contactRouter);

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

// app.listen(config.serverPort, () => console.log(`FusionAuth example app listening on port ${config.serverPort}.`));
// console.log('FusionAuth example app listening on port');

module.exports = app;
