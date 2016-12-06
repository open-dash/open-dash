import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SSR } from 'meteor/meteorhacks:ssr';
import { send } from './actions';
import { Settings } from '/lib/collections';
import { Logger } from '/server/api';


/**
 * Send an email with a link that the user can use to reset their password.
 * @param {String} userId - The id of the user to send email to.
 * @param {String} [optionalEmail] Address to send the email to.
 *                 This address must be in the user's `emails` list.
 *                 Defaults to the first email in the list.
 * @return {Job} - returns a sendEmail Job instance
 */
export function sendResetPasswordEmail(userId, optionalEmail) {
  // Make sure the user exists, and email is one of their addresses.
  const user = Meteor.users.findOne(userId);

  if (!user) {
    Logger.error('sendResetPasswordEmail - User not found');
    throw new Meteor.Error('user-not-found', 'User not found');
  }

  let email = optionalEmail;

  // pick the first email if we weren't passed an email.
  if (!optionalEmail && user.emails && user.emails[0]) {
    email = user.emails[0].address;
  }

  // make sure we have a valid email
  if (!email || !_.includes(_.map(user.emails || [], 'address'), email)) {
    Logger.error('sendResetPasswordEmail - Email not found');
    throw new Meteor.Error('email-not-found', 'Email not found');
  }

  const token = Random.secret();
  const when = new Date();
  const tokenObj = { token, email, when };

  Meteor.users.update(userId, {
    $set: {
      'services.password.reset': tokenObj
    }
  });

  Meteor._ensure(user, 'services', 'password').reset = tokenObj;

  SSR.compileTemplate('resetPassword', Assets.getText('email/templates/reset_password.html'));

  const siteTitle = Settings.get('siteTitle');
  const url = Accounts.urls.resetPassword(token);

  return send({
    to: email,
    from: Settings.get('adminEmail'),
    subject: `${siteTitle} - Reset your password`,
    html: SSR.render('resetPassword', { siteTitle, user, url })
  });
}


/**
 * Send an email with a link the user can use verify their email address.
 * @param {String} userId - The id of the user to send email to.
 * @param {String} [email] Optional. Address to send the email to.
 *                 This address must be in the user's emails list.
 *                 Defaults to the first unverified email in the list.
 * @return {Job} - returns a sendEmail Job instance
 */
export function sendVerificationEmail(userId, email) {
  // Make sure the user exists, and email is one of their addresses.
  const user = Meteor.users.findOne(userId);

  if (!user) {
    Logger.error('sendVerificationEmail - User not found');
    throw new Meteor.Error('user-not-found', 'User not found');
  }

  let address = email;

  // pick the first unverified address if no address provided.
  if (!email) {
    const unverifiedEmail = _.find(user.emails || [], (e) => !e.verified) || {};

    address = unverifiedEmail.address;

    if (!address) {
      const msg = 'No unverified email addresses found.';
      Logger.error(msg);
      throw new Meteor.Error('no-unverified-address', msg);
    }
  }

  // make sure we have a valid address
  if (!address || !_.includes(_.map(user.emails || [], 'address'), address)) {
    const msg = 'Email not found for user';
    Logger.error(msg);
    throw new Meteor.Error('email-not-found', msg);
  }

  const token = Random.secret();
  const when = new Date();
  const tokenObj = { token, address, when };

  Meteor.users.update({ _id: userId }, {
    $push: {
      'services.email.verificationTokens': tokenObj
    }
  });

  SSR.compileTemplate('verifyEmail', Assets.getText('email/templates/verify_email.html'));

  const siteTitle = Settings.get('siteTitle');
  const url = Accounts.urls.verifyEmail(token);

  return send({
    to: address,
    from: Settings.get('adminEmail'),
    subject: `${siteTitle} - Verify your email`,
    html: SSR.render('verifyEmail', { siteTitle, url, email: address })
  });
}
