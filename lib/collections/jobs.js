import { JobCollection } from 'meteor/vsivsi:job-collection';

const Jobs = JobCollection('jobs', { noCollectionSuffix: true });

export default Jobs;
