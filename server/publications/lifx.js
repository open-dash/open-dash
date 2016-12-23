import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Devices, Settings } from '/lib/collections';
import { Lifx, Logger } from '/server/api';

export default function () {

  Meteor.publish('lifx-lights', function () {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      return this.ready();
    }

    if (!Settings.get('lifx.apiKey')) {
      return this.ready();
    }

    const lifx = new Lifx();

    const poll = () => {
      let res;
      try {
        Logger.info('Retrieving LIFX lights...');
        res = lifx.listLights();
      } catch(e) {
        Logger.error(e, 'Lifx API error');
        throw new Error(e);
      }

      res.data.forEach((doc) => {
        doc.provider = 'Lifx';

        Devices.upsert({ id: doc.id }, {
          $set: doc
        }, {
          upsert: true
        });
      });

      Logger.info('Lifx lights successfully synced');
    };

    // get the state immediately
    poll();

    // then poll the API every 20 secs
    const interval = Meteor.setInterval(poll, 20000);

    this.onStop(() => {
      Meteor.clearInterval(interval);
    });

    return Devices.find();
  });

}
