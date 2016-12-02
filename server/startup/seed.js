import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Settings } from '/lib/collections';
import { Logger } from '/server/api';

// Seed the database with some default data if none exists.

export default function () {
  // bail if no settings exist
  if (_.isEmpty(_.omit(Meteor.settings, ['public']))) {
    return Logger.debug('No Meteor settings found. Skipping import.');
  }

  // Users
  const defaultUsers = Meteor.settings.defaultUsers;

  if (Meteor.users.find().count() < 1 && Array.isArray(defaultUsers)) {

    defaultUsers.forEach((user) => {
      const id = Accounts.createUser({
        email: user.email,
        username: user.username,
        password: user.password
      });
      Roles.addUsersToRoles(id, user.roles);

      Logger.info(`
        ********************************************
        ********* Default User Created *************
          Username: ${user.username} Password: ${user.password}
        ********************************************
      `);
    });
  }

  // Settings
  const settings = Meteor.settings;

  let defaultSettings = {};

  if (settings) {
    const allowedValues = [
      'siteTitle',
      'adminEmail',
      'mailUrl',
      'lifxApiKey',
      'awsKey',
      'awsSecret',
      'awsRegion',
      'kadiraAppId',
      'kadiraAppSecret',
      'segmentKey',
      'slackWebhookUrl'
    ];
    defaultSettings = _.pick(settings, allowedValues);
  }

  // create default settings if none exist
  if (Settings.find().count() < 1) {
    if (!defaultSettings.siteTitle) {
      defaultSettings.siteTitle = 'Launchdock';
    }

    Settings.insert(defaultSettings);
    Logger.info('Default settings document created');
  } else {
    const settingsDoc = Settings.findOne();

    let settingsChanged = false;

    if (!!settingsDoc && !!defaultSettings) {
      const s = settingsDoc;

      // update any empty settings fields with values from settings.json
      for (const key in defaultSettings) {
        if ({}.hasOwnProperty.call(defaultSettings, key)) {
          if (!s[key] && !_.isBoolean(s[key]) && !!defaultSettings[key]) {
            s[key] = defaultSettings[key];
            settingsChanged = true;
            Logger.info(`Updating empty setting: ${key}`);
          }
        }
      }

      // make the update if anything changed
      if (settingsChanged) {
        const updatedSettings = _.omit(s, ['_id', 'createdAt', 'updatedAt']);

        Settings.update({ _id: s._id }, {
          $set: updatedSettings
        });

        Logger.info(updatedSettings, 'Succesfully updated settings');
      } else {
        Logger.info('No empty settings. Not importing anything from settings.json');
      }
    }
  }
}
