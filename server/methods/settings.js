import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Settings } from '/lib/collections';
import { Logger } from '/server/api';
import _ from 'lodash';


export default function () {

  Meteor.methods({
    'settings/update'(settings) {

      const logger = Logger.child({
        meteor_method: 'settings/update',
        meteor_method_args: [settings],
        userId: this.userId
      });

      check(settings, Object);

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Action not allowed!';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      const updates = _.omit(settings, '_id');

      try {
        Settings.update(settings._id, { $set: updates });
      } catch(e) {
        const err = `Update failed: ${e}`;
        logger.error(err);
        throw new Meteor.Error(err);
      }

      logger.info('Settings successfully updated.');

      return true;
    }
  });

}
