import 'babel-polyfill'
import express from 'express'
import path from 'path'
//import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import http from 'http'
import session from 'express-session'
import multer from 'multer'
let debug = require('debug')('galaxydatamanager:server')


let app = express()
/**
 * load configuration
 */
// let config = require('./utils/config')(path.join(__dirname,'/config/config.json'))
/**
 * connect the database
 */
// require('./utils/dbconnector')(config.dbconf.username, config.dbconf.password, config.dbconf.db_address, config.dbconf.db_port, config.dbconf.dbname)
/**
 * load route
 */
let load_routes = require('./routes/index')

/**
 * view engine setup
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * uncomment after placing your favicon in /public
 */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: {
    maxAge: 60 * 1000 * 60 * 24
  }
}))
app.use(express.static(path.join(__dirname, 'public')))
/**
 *
 */
app.use(multer({
  dest: '/Users/fuckingnoob/Documents/galaxydataManager/common/uploadtemp'
}).fields([{ name: 'genefile', maxCount: '5' }, { name: 'datas', maxCount: '5'}]))
/**
 * route partition
 */
app.use(load_routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

/**
 * error handler
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

let server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
  debug('Listening on ' + bind)
}
