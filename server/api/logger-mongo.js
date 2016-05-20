import { Mongo } from 'meteor/mongo';
import { Logs } from '/lib/collections';

export default class BunyanMongo {
  // constructor(options) {
  //   const opts = options || {};
  //
  //   if (!(opts.collection instanceof Mongo.Collection)) {
  //     throw new Error('BunyanMongo requires a collection option');
  //   }
  //
  //   this.collection = opts.collection;
  // }
}


BunyanMongo.prototype.write = Meteor.bindEnvironment((log) => {
  // const levelToName = {
  //   10: 'trace',
  //   20: 'debug',
  //   30: 'info',
  //   40: 'warn',
  //   50: 'error',
  //   60: 'fatal'
  // };
  //
  // const record = {
  //   level: levelToName[log.level],
  //   hostname: log.hostname,
  //   pid: log.pid,
  //   message: log.msg,
  //   time: log.time
  // };
  //
  // if (log.data) {
  //   record.data = log.data;
  // }

  // console.log(this);
  Logs.insert(log);
});
