import _ from 'lodash';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { BrowserPolicy } from 'meteor/browser-policy-common';

export default function () {

  // Get a list of all methods by running
  // `Meteor.server.method_handlers` in meteor shell.
  // Or use Object.keys(Meteor.server.method_handlers)
  const AUTH_METHODS = [
    'login',
    'logout',
    'logoutOtherClients',
    'getNewToken',
    'removeOtherTokens',
    'configureLoginService',
    'changePassword',
    'forgotPassword',
    'resetPassword',
    'verifyEmail',
    'createUser',
    'ATRemoveService',
    'ATCreateUserServer',
    'ATResendVerificationEmail'
  ];

  // Only allow 2 login attempts per connection per 5 seconds
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(AUTH_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; }
  }, 2, 5000);


  BrowserPolicy.content.allowOriginForAll('*.typekit.net');
}
