import subDays from 'date-fns/sub_days';
import { Jobs } from '/lib/collections';
import { Logger } from '/server/api';

export default function () {
  /**
   * cleanupJobs
   * Clean up jobs in the database that are older than 30 days
   */
  const cleanupJobs = Jobs.processJobs('cleanupJobs', {
    pollInterval: 60 * 60 * 1000, // every hour
    workTimeout: 60000
  }, function (job, callback) {
    Logger.info('[Jobs]: Processing "cleanupJobs"...');

    const ids = Jobs.find({
      status: {
        $in: ['cancelled', 'completed', 'failed']
      },
      updated: {
        $lt: subDays(new Date(), 30)
      }
    }, {
      fields: {
        _id: 1
      }
    }).map((jb) => {
      return jb._id;
    });

    if (ids.length > 0) {
      Jobs.removeJobs(ids);
    }

    Logger.info(`[Jobs]: Cleaned up ${ids.length} old jobs`);

    job.done(`Cleaned up ${ids.length} old jobs`);

    return callback();
  });

  Jobs.find({
    type: 'cleanupJobs',
    status: 'ready'
  }).observe({
    added() {
      return cleanupJobs.trigger();
    }
  });


  /**
   * cleanCancelledJobs
   * Clean up all cancelled jobs
   */
  const cleanCancelledJobs = Jobs.processJobs('cleanCancelledJobs', {
    pollInterval: 60 * 60 * 1000, // every hour
    workTimeout: 60000
  }, function (job, callback) {
    Logger.info('[Jobs]: Processing "cleanCancelledJobs"...');

    const ids = Jobs.find({
      status: {
        $in: ['cancelled']
      }
    }, {
      fields: {
        _id: 1
      }
    }).map((jb) => {
      return jb._id;
    });

    if (ids.length > 0) {
      Jobs.removeJobs(ids);
    }

    const msg = `Cleaned up ${ids.length} cancelled jobs`;

    Logger.info(`[Jobs]: ${msg}`);

    job.done(msg);

    return callback();
  });

  Jobs.find({
    type: 'cleanCancelledJobs',
    status: 'ready'
  }).observe({
    added() {
      return cleanCancelledJobs.trigger();
    }
  });
}
