import later from 'later';
import { Roles } from 'meteor/alanning:roles';
import { Job } from 'meteor/vsivsi:job-collection';
import { Jobs } from '/lib/collections';
import { Logger } from '/server/api';
import ProcessJobs from '/server/jobs';

export default function () {
  Jobs.deny({
    admin(userId, method, params) {
      return !Roles.userIsInRole(userId, 'admin');
    },
    creator(userId, method, params) {
      return !Roles.userIsInRole(userId, ['admin', 'job-creator']);
    },
    worker(userId, method, params) {
      return !Roles.userIsInRole(userId, ['admin', 'job-worker']);
    }
  });

  Jobs.startJobServer(() => {
    Logger.info('Jobs server started');
    ProcessJobs();

    // cleanup old jobs from the database
    new Job(Jobs, 'cleanupJobs', {}).repeat({
      schedule: later.parse.text('every hour')
    }).save({
      cancelRepeats: true
    });

    // cleanup cancelled jobs from the database
    new Job(Jobs, 'cleanCancelledJobs', {}).repeat({
      schedule: later.parse.text('every hour')
    }).save({
      cancelRepeats: true
    });
  });
}
