import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import simpleSchemaConfig from '../config/simple-schema';

simpleSchemaConfig();

const Settings = new Mongo.Collection('settings');

Settings.Schema = new SimpleSchema({

  siteTitle: {
    type: String,
    optional: true
  },

  adminEmail: {
    type: String,
    optional: true,
    private: true
  },

  mailUrl: {
    type: String,
    optional: true,
    private: true
  },

  lifxApiKey: {
    type: String,
    optional: true
  },

  smartthingsClientId: {
    type: String,
    optional: true,
    private: true
  },

  smartthingsClientSecret: {
    type: String,
    optional: true,
    private: true
  },

  segmentKey: {
    type: String,
    optional: true
  },

  kadiraAppId: {
    type: String,
    optional: true,
    private: true
  },

  kadiraAppSecret: {
    type: String,
    optional: true,
    private: true
  },

  slackWebhookUrl: {
    type: String,
    optional: true,
    private: true
  },

  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      }
      this.unset();
    },
    denyUpdate: true,
    private: true
  },

  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    private: true
  }
});

Settings.attachSchema(Settings.Schema);

/**
 * Deny client side operations by default
 */
Settings.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

/**
 * A recursive settings object parser
 * @param {Object} object  - Object to get the value from
 * @param {String|[String]} setting  - The property name to get (as a '.' delimited string)
 * @return {Any} - Property value or undefined if not found.
 */
function getSetting(object = {}, setting) {
  const elems = Array.isArray(setting) ? setting : setting.split('.');
  const name = elems[0];
  const value = object[name];
  if (elems.length <= 1) {
    return value;
  }
  if (value === null || typeof value !== 'object') {
    return undefined;
  }
  return getSetting(value, elems.slice(1));
}


/**
 * Get an app setting from the database or Meteor Settings
 * @param  {String} setting - a '.' delimited string representing the settings obj
 * @param  {Any} defaultValue - default value if nothing found
 * @return {Any} returns the setting or undefined
 */
Settings.get = (setting, defaultValue) => {
  const settings = Settings.find().fetch()[0];

  if (Meteor.isServer && Meteor.settings && !!getSetting(Meteor.settings, setting)) {
    // if on the server, look in Meteor.settings
    return getSetting(Meteor.settings, setting);

  } else if (Meteor.settings.public && !!getSetting(Meteor.settings.public, setting)) {
    // look in Meteor.settings.public
    return getSetting(Meteor.settings.public, setting);

  } else if (settings && !!getSetting(settings, setting)) {
    // look in Settings collection
    return getSetting(settings, setting);

  } else if (typeof defaultValue !== 'undefined') {

    // fallback to default
    return  defaultValue;
  }
  // or return undefined
  return undefined;
};


export default Settings;
