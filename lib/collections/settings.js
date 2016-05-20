import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import simpleSchemaConfig from '../config/simple-schema';

simpleSchemaConfig();

const Settings = new Mongo.Collection('settings');

Settings.Schema = new SimpleSchema({

  siteTitle: {
    type: String,
    optional: true,
    label: 'Site Title'
  },

  adminEmail: {
    type: String,
    optional: true,
    label: 'Admin Email',
    private: true
  },

  lifxApiKey: {
    type: String,
    optional: true,
    label: 'Lifx API Key'
  },

  segmentKey: {
    type: String,
    optional: true,
    label: 'Segment.com API Key'
  },

  kadiraAppId: {
    type: String,
    optional: true,
    label: 'App Id',
    private: true
  },

  kadiraAppSecret: {
    type: String,
    optional: true,
    label: 'App Secret',
    private: true
  },

  slackWebhookUrl: {
    type: String,
    optional: true,
    label: 'Webhook URL',
    private: true
  },

  createdAt: {
    type: Date,
    label: 'Created',
    autoValue: function() {
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
    label: 'Updated',
    autoValue: function() {
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

Settings.get = (setting, defaultValue) => {
  const settings = Settings.find().fetch()[0];

  if (Meteor.isServer && Meteor.settings && !!Meteor.settings[setting]) {
    // if on the server, look in Meteor.settings
    return Meteor.settings[setting];

  } else if (Meteor.settings && Meteor.settings.public && !!Meteor.settings.public[setting]) {
    // look in Meteor.settings.public
    return Meteor.settings.public[setting];

  } else if(settings && (typeof settings[setting] !== 'undefined')) {
    // look in Settings collection
    return settings[setting];

  } else if (typeof defaultValue !== 'undefined') {

    // fallback to default
    return  defaultValue;
  }
  // or return undefined
  return undefined;
};

export default Settings;
