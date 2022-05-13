var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = process.env.PORT || "8000";
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proxiesRouter = require('./routes/proxies');

var app = express();
const res = require('express/lib/response');
const Proxy = require("./model/Proxy");

// view engine setup



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/proxies', proxiesRouter)
// connect mongoose db

var db = "mongodb://localhost:27017/sockserver";

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection; 
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
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
// 



//149.6.162.10:80:yngroup-40:Tung123abc



app.listen(port, async () => {
  const proxies = await Proxy.find({});
  await proxiesRouter.loadProxies(proxies); 

  console.log(`Listening to requests on http://localhost:${port}`);
});


// Proxy

