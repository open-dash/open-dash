import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { SSR } from 'meteor/meteorhacks:ssr';
import { Invitations, Settings, Users } from '/lib/collections';
import { Email, Logger } from '/server/api';
import _ from 'lodash';

export default function () {

  Meteor.methods({

    /**
     * Change a user's email
     * @param options {Object} - { userId: String, email: String }
     * @return {Boolean}
     */
    'changeUserEmail'(options) {

      const logger = Logger.child({
        meteor_method: 'changeUserEmail',
        meteor_method_args: [options],
        userId: this.userId
      });

      check(options, {
        userId: String,
        email: String
      });

      const isAdmin = Roles.userIsInRole(this.userId, 'superuser');

      if (options.userId !== this.userId && !isAdmin) {
        const err = 'AUTH ERROR: Action not allowed';
        logger.error(err);
        throw new Meteor.Error('action-not-allowed', err);
      }

      const id = options.userId || this.userId;

      const user = Users.findOne(id);

      if (!user) {
        const err = 'User not found';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      const oldEmail = user.emails[0].address;

      if (options.email.toLowerCase() === oldEmail.toLowerCase()) {
        logger.info('Same email. Not updating.');
        return true;
      }

      Accounts.addEmail(id, options.email);

      Accounts.removeEmail(id, oldEmail);

      logger.info(`Email succesfully updated to ${options.email} for user ${id}`);

      return true;
    },


    /**
     * Add roles to users. Does NOT overwrite
     * the user's existing roles.
     */
    'addUsersToRoles'(options) {

      const logger = Logger.child({
        meteor_method: 'addUsersToRoles',
        meteor_method_args: options,
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Invalid credentials';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(options, {
        users: Match.OneOf(String, [String]),
        roles: Match.OneOf(String, [String])
      });

      try {
        Roles.addUsersToRoles(options.users, options.roles);
      } catch (err) {
        logger.error(err);
        throw new Meteor.Error(err);
      }

      if(_.isArray(options.users)) {
        _.each(options.users, (user) => {
          logger.info(`Added user ${user} to role(s) ${options.roles}`);
        });
      } else {
        logger.info(`Added user ${options.users} to role(s) ${options.roles}`);
      }

      return true;
    },


    /**
     * Set roles for users. This DOES overwrite
     * any of the user's existing roles.
     */
    'setUserRoles'(options) {

      const logger = Logger.child({
        meteor_method: 'setUserRoles',
        meteor_method_args: [options],
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Invalid credentials';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(options, {
        users: Match.OneOf(String, [String]),
        roles: Match.OneOf(String, [String])
      });

      try {
        Roles.setUserRoles(options.users, options.roles);
      } catch (err) {
        logger.error(err);
        throw new Meteor.Error(err);
      }

      if(_.isArray(options.users)) {
        _.each(options.users, (user) => {
          logger.info(`Set user ${user} to role(s) ${options.roles}`);
        });
      } else {
        logger.info(`Set user ${options.users} to role(s) ${options.roles}`);
      }

      return true;
    },


    sendUserInvite(options) {

      const logger = Logger.child({
        meteor_method: 'sendUserInvite',
        meteor_method_args: [options],
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Invalid credentials';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(options, {
        email: String,
        role: String
      });

      this.unblock();

      if (!!Invitations.findOne({ email: options.email })) {
        const err = 'Email has already been invited';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      options.token = Random.hexString(32);
      options.invitedBy = this.userId;

      Invitations.insert(options);

      const url = Meteor.absoluteUrl() + 'invite/' + options.token;
      const emailHtml = `email/templates/${options.role}-invitation.html`;
      const siteTitle = Settings.get('app.title', 'OpenDash');
      const adminEmail = Settings.get('app.adminEmail', 'invites@no-reply.com');

      SSR.compileTemplate('user-invite', Assets.getText(emailHtml));
      const content = SSR.render('user-invite', { siteTitle, url });

      const emailOpts = {
        to: options.email,
        from: `${siteTitle} <${adminEmail}>`,
        subject: `You're invited to ${siteTitle}!`,
        html: content
      };

      Meteor.defer(() => {
        Email.send(emailOpts);
      });

      logger.info(`New user invited: ${options.email}`);

      return true;
    },


    activateUserInvite(options) {

      check(options, {
        username: String,
        email: String,
        password: String,
        inviteToken: String
      });

      const logger = Logger.child({
        meteor_method: 'activateUserInvite',
        meteor_method_args: [options],
        userId: this.userId
      });

      const invite = Invitations.findOne({ token: options.inviteToken });

      if (!invite) {
        const err = 'Invitation not found.';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      // invite can only be used once
      if (invite.accepted) {
        const err = 'Invitation has already been used.';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      if (Accounts.findUserByUsername(options.username)) {
        const msg = 'Username already exists';
        logger.warn(msg);
        throw new Meteor.Error(msg);
      }

      const userId = Accounts.createUser({
        username: options.username,
        email: invite.email,
        password: options.password
      });

      Roles.setUserRoles(userId, [invite.role]);

      logger.info(`New user created with email ${options.email} and role ${invite.role}`);

      Invitations.update({ _id: invite._id }, {
        $set: {
          accepted: true,
          acceptedDate: new Date(),
          userId: userId
        }
      }, (err, res) => {
        if (!err) {
          logger.info(`Invitation successfully accepted by ${invite.email}`);
        }
      });

      return true;
    },


    revokeInvitation(inviteId) {

      const logger = Logger.child({
        meteor_method: 'revokeInvitation',
        meteor_method_args: [inviteId],
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Invalid credentials';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(inviteId, String);

      try {
        Invitations.remove(inviteId);
      } catch (err) {
        logger.error(err);
        throw new Meteor.Error(err);
      }

      logger.info(`Successfully removed invitation: ${inviteId}`);

      return true;
    },


    deleteInvitedUser(userId) {

      const logger = Logger.child({
        meteor_method: 'deleteInvitedUser',
        meteor_method_args: [userId],
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Invalid credentials';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(userId, String);

      this.unblock();

      Invitations.remove({ userId: userId });
      Users.remove(userId);

      logger.info(`User ${userId} succesfully deleted.`);

      return true;
    }

  });

}
