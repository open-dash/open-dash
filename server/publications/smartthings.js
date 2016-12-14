import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Devices, Users } from '/lib/collections';
import { Logger } from '/server/api';

export default function () {

  Meteor.publish('smartthings-devices', function () {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      return this.ready();
    }

    const user = Users.findOne(this.userId);

    const { endpoint, token } = user.services.smartthings;

    if (!endpoint || !token) {
      Logger.warn('Endpoint and token required for SmartThings publication');
      return this.ready();
    }

    const poll = () => {
      let res;
      try {
        res = HTTP.get(`${endpoint.uri}/allDevices`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch(err) {
        Logger.error(err);
        throw err;
      }

      const data = JSON.parse(res.content);

      data.forEach((doc) => {
        doc.userId = this.userId;
        doc.provider = 'SmartThings';

        Devices.upsert({ id: doc.id }, {
          $set: doc
        }, {
          upsert: true
        });
      });

      Logger.info('SmartThings successfully synced');
    };

    // get the state immediately
    poll();

    // then poll the API every 30 secs
    const interval = Meteor.setInterval(poll, 30000);

    this.onStop(() => {
      Meteor.clearInterval(interval);
    });

    return Devices.find({
      provider: 'SmartThings',
      userId: this.userId
    });
  });

}
