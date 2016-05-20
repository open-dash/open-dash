import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';
import { Bunyan2Loggly } from 'bunyan-loggly';
import BunyanMongo from './logger-mongo';
import { Logs, Settings } from '/lib/collections';

/**
 * Global logging config
 */

const logLevel = process.env.LOG_LEVEL || 'INFO';

// console output formatting
const formatOut = bunyanFormat({
  outputMode: 'short'
});

// default console config
let streams = [{
  level: 'info',
  stream: logLevel !== 'DEBUG' ? formatOut : process.stdout
}];


// Loggly config (only used in production)
if (process.env.NODE_ENV === 'production') {
  const logglyToken = process.env.LOGGLY_TOKEN;
  const logglySubdomain = process.env.LOGGLY_SUBDOMAIN;

  if (logglyToken && logglySubdomain) {
    const logglyStream = {
      type: 'raw',
      stream: new Bunyan2Loggly({
        token: logglyToken,
        subdomain: logglySubdomain
      })
    };
    streams.push(logglyStream);
  }
}


// Mongo logger config
// const mongoStream = {
//   type: 'raw',
//   stream: new BunyanMongo()
// };
// streams.push(mongoStream);


const name = Settings.get('siteTitle', 'Home Dash');

// create default logger instance
const Logger = bunyan.createLogger({
  name,
  streams
});

// set default level
Logger.level(logLevel);

export default Logger;
