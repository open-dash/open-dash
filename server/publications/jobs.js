import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Jobs } from '/lib/collections';

export default function () {

  Meteor.publish('jobs-list', function (limit) {
    check(limit, Match.Optional(Number));

    if (Roles.userIsInRole(this.userId, 'superuser')) {
      return Jobs.find({
        type: {
          $nin: ['cleanupJobs', 'cleanCancelledJobs']
        },
        status: {
          $nin: ['cancelled']
        }
      }, {
        sort: {
          updated: -1
        },
        limit: limit || 10
      });
    }
    return this.ready();
  });

}
