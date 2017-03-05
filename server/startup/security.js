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
      return _.includes(AUTH_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; }
  }, 2, 5000);


  BrowserPolicy.content.allowOriginForAll('*.typekit.net');
  BrowserPolicy.content.allowOriginForAll('*.segment.com');
  BrowserPolicy.content.allowOriginForAll('d1l6p2sc9645hc.cloudfront.net');
  BrowserPolicy.content.allowOriginForAll('www.google-analytics.com');
  BrowserPolicy.content.allowOriginForAll('cdn.mxpnl.com');
  BrowserPolicy.content.allowOriginForAll('*.gosquared.com');
}
