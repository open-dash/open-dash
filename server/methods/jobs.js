import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Job } from 'meteor/vsivsi:job-collection';
import { Jobs } from '/lib/collections';
import { Logger } from '/server/api';

export default function () {

  Meteor.methods({
    'jobs/addToQueue'(name, options = {}) {

      const logger = Logger.child({
        meteor_method: 'jobs/addToQueue',
        meteor_method_args: [name, options],
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, ['admin', 'api'])) {
        const err = 'AUTH ERROR: Action not allowed!';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(name, String);
      check(options, Match.Optional(Object));

      logger.info(`Adding new job to queue for ${name}`);

      const job = new Job(Jobs, name, options);

      job.save();

      return true;
    },


    'jobs/remove'(jobId) {
      const logger = Logger.child({
        meteor_method: 'jobs/remove',
        meteor_method_args: [jobId],
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, ['admin', 'api'])) {
        const err = 'AUTH ERROR: Action not allowed!';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(jobId, String);

      Jobs.remove({ _id: jobId });

      logger.info(`Removed job ${jobId}`);

      return true;
    }
  });

}
