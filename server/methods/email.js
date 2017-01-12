import getServiceConfig from 'nodemailer-wellknown';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Jobs, Settings } from '/lib/collections';
import { Logger, Email } from '/server/api';

export default function () {

  Meteor.methods({
    /**
     * Verify the current email configuration
     * @param {Object} settings - optional settings object (otherwise uses settings in database)
     * @return {Boolean} - returns true if SMTP connection succeeds
     */
    'email/verifySettings'(settings) {
      if (!Roles.userIsInRole(this.userId, ['admin'])) {
        Logger.error('email/verifySettings: Access Denied');
        throw new Meteor.Error('access-denied', 'Access Denied');
      }

      this.unblock();

      check(settings, Match.Optional(Object));

      let config;

      // if a settings object has been provided, build a config
      if (typeof settings === 'object') {
        const { service, host, port, user, pass } = settings;

        if (service === 'custom' && host && port && user && pass) {
          // create a custom Nodemailer config
          config = { host, port, auth: { user, pass: pass } };
        } else if (service && user && pass) {
          // create a Nodemailer config from the nodemailer-wellknown services
          config = getServiceConfig(service) || {};
          config.auth = { user, pass };
        }
      }

      try {
        return Meteor.wrapAsync(Email.verifyConfig)(config || Email.getMailConfig());
      } catch (e) {
        Logger.error(e);
        throw new Meteor.Error(e.responseCode, e.response);
      }
    },


    /**
     * Save new email configuration
     * @param {Object} settings - mail provider settings
     * @return {Boolean} - returns true if update succeeds
     */
    'email/saveSettings'(settings) {
      if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'dashboard'])) {
        Logger.error('email/saveSettings: Access Denied');
        throw new Meteor.Error('access-denied', 'Access Denied');
      }

      check(settings, {
        service: String,
        host: Match.Optional(String),
        port: Match.Optional(Number),
        user: String,
        pass: String
      });

      Settings.set('mail', settings);

      Logger.info(settings, 'Email settings updated');

      return true;
    },


    /**
     * Retry a failed or cancelled email job
     * @param {String} jobId - a sendEmail job ID
     * @return {Boolean} - returns true if job is successfully restarted
     */
    'emails/retryFailed'(jobId) {
      if (!Roles.userIsInRole(this.userId, ['owner', 'admin', 'dashboard'])) {
        Logger.error('email/retryFailed: Access Denied');
        throw new Meteor.Error('access-denied', 'Access Denied');
      }

      check(jobId, String);

      Logger.debug(`emails/retryFailed - restarting email job '${jobId}'`);

      Jobs.update({ _id: jobId }, {
        $set: {
          status: 'ready'
        }
      });

      return true;
    }
  });

}
