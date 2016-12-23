import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Settings } from '/lib/collections';
import { Logger } from '/server/api';


export default function () {

  Meteor.methods({
    /**
     * Set an app setting in the database
     * @param  {Object} settings - the entire settings document
     * @return {Object} returns the settings object
     */
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

      const updates = _.omit(settings, ['_id', 'createdAt', 'updatedAt']);

      try {
        Settings.update(settings._id, { $set: updates });
      } catch(e) {
        const msg = 'Settings update failed';
        logger.error(e, msg);
        throw new Meteor.Error('settings-update-failed', msg);
      }

      logger.info('Settings successfully updated.');

      return settings;
    },


    /**
     * Set an app setting in the database
     * @param  {String} setting - a '.' delimited string representing the settings obj path
     * @param  {Any} value - the value to set
     * @return {Object} returns the update object
     */
    'settings/set'(setting, value) {

      const logger = Logger.child({
        meteor_method: 'settings/update',
        meteor_method_args: [setting, value],
        userId: this.userId
      });

      check(setting, String);
      check(value, Match.Any);

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Action not allowed!';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      const settings = Settings.findOne();
      const update = _.set({}, setting, value);

      try {
        Settings.update({ _id: settings._id }, {
          $set: update
        });
      } catch(e) {
        const msg = 'Setting update failed';
        logger.error(e, msg);
        throw new Meteor.Error('setting-update-failed', msg);
      }

      logger.info({ update }, 'Settings successfully updated.');

      return update;
    }
  });

}
