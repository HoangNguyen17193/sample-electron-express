const express = require('express');
const http = require('http');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const routes = require('./routes');
const app = express();

function errorHandler (err, req, res, next) {ç
  if (res.headersSent) {
    return next(err)
  }
  res.status(500);
  res.render('error', { error: err })
}

module.exports = () => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(cors());
  app.use(errorHandler);

  app.engine('.hbs', hbs.__express);
  app.set('view engine', 'hbs');

  app.use(routes);

  const server = http.createServer(app);
  server.listen(7777);
  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        LoggerService.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        LoggerService.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ' + ${address.port}`;
  });
};
