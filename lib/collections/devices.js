import { Mongo } from 'meteor/mongo';

const Devices = new Mongo.Collection('devices');

Devices.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export default Devices;
