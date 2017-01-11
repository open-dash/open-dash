import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Devices } from '/lib/collections';


export default function () {
  // all devices a user owns
  Meteor.publish('devices', function () {
    if (!Roles.userIsInRole(this.userId, ['admin', 'manager'])) {
      return this.ready();
    }
    return Devices.find({ userId: this.userId });
  });

  // a single device that a user owns
  Meteor.publish('device', function (_id) {
    check(_id, String);

    if (!Roles.userIsInRole(this.userId, ['admin', 'manager'])) {
      return this.ready();
    }

    const device = Devices.findOne({ _id });

    if (device.userId !== this.userId) {
      return this.ready();
    }

    return Devices.find({ _id });
  });

}
