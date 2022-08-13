require('dotenv').config()
var bodyParser = require('body-parser')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var loginRouter = require('./routes/loginRouter');
var carRouter = require('./routes/carRouter');
var honoraireRouter = require('./routes/honoraireRouter');
var insuranceRouter = require('./routes/insuranceRouter');
var missionRouter = require('./routes/missionRouter');
var payementRouter = require('./routes/payementRouter');
var policeRouter = require('./routes/policeRouter');
var tiersRouter = require('./routes/tiersRouter');
var localMissionRouter = require('./routes/localMissionRouter');

var mongoose = require('mongoose')
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//connect to database 
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/cars',carRouter);
app.use('/honoraires',honoraireRouter);
app.use('/insurances',insuranceRouter);
app.use('/missions',missionRouter);
app.use('/payements',payementRouter);
app.use('/police',policeRouter);
app.use('/tiers',tiersRouter);
app.use('/localmission',localMissionRouter);

var honoraireRouter = require('./routes/honoraireRouter');
var insuranceRouter = require('./routes/insuranceRouter');
var missionRouter = require('./routes/missionRouter');
var localMissionRouter = require('./routes/localMissionRouter');
var payementRouter = require('./routes/payementRouter');
var policeRouter = require('./routes/policeRouter');
var tiersRouter = require('./routes/tiersRouter');

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

module.exports = app;
