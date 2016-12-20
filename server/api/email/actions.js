import { Job } from 'meteor/vsivsi:job-collection';
import { Jobs } from '/lib/collections';


/**
 * Email.send()
 * (Job API doc) https://github.com/vsivsi/meteor-job-collection/#user-content-job-api
 * @param  {Object} options - object containing to/from/subject/html String keys
 * @return {Boolean} returns job object
 */
export function send(options) {
  return new Job(Jobs, 'sendEmail', options)
    .retry({
      retries: 5,
      wait: 3 * 60000
    }).save();
}
