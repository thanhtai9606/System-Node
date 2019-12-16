var http = require('http')
var express = require('express')

/**
 * Load all routes
 */
var routes = require('./routes')
var province = require('./routes/ProvinceRoute');
var district = require('./routes/DistrictRoute');
var admin = require('./routes/AdminRoute');
var culture = require('./routes/CultureViewRoute.js');
var ward = require('./routes/WardRoute');
var employee = require('./routes/EmployeeRoute');
var address = require('./routes/Address');
var phone = require('./routes/Phone');
//#region
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var app = express()


// all environments
app.set('port', process.env.PORT || 4300)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8',
                  duration: 30 * 60 * 1000,
                  activeDuration: 5 * 60 * 1000 }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static(path.join(__dirname, 'public')))
//#engregion


app.get('/', routes)
app.use('/Province/',province);
app.use('/Admin',admin);
app.use('/Language',culture);
app.use('/Ward/',ward);
app.use('/District/',district);
app.use('/HumanResource/', employee);
app.use('/Address/',address);
app.use('/Phone/',phone);
// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})