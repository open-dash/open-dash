import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Invitations, Users } from '/lib/collections';

export default function () {

  // user count
  Meteor.publish('users-count', function () {
    if (Roles.userIsInRole(this.userId, ['admin', 'manager'])) {
      Counts.publish(this, 'users-count', Users.find());
    }
    return [];
  });

  // single user account
  Meteor.publish('user-account', function (_id) {
    if (this.userId === _id || Roles.userIsInRole(this.userId, ['admin', 'manager'])) {
      return Users.find({ _id }, {
        fields: {
          services: 0
        }
      });
    }
    return [];
  });


  // Roles
  Meteor.publish(null, function () {
    return Meteor.roles.find();
  });


  // accounts and invites management page
  Meteor.publish('accounts-management', function () {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      return [
        Users.find({}, {
          fields: {
            'emails.address': 1,
            roles: 1
          }
        }),
        Invitations.find({ accepted: false }, {
          fields: {
            email: 1,
            role: 1,
            token: 1,
            createdAt: 1,
            invitedBy: 1
          },
          sort: {
            createdAt: -1
          }
        })
      ];
    }
    return [];
  });


  // invite link landing page
  Meteor.publish('invite', function (token) {
    check(token, String);
    return Invitations.find({ token: token }, {
      fields: {
        email: 1,
        token: 1,
        accepted: 1
      }
    });
  });

}
