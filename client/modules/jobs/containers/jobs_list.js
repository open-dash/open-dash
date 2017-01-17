import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import JobsList from '../components/jobs_list';

export const composer = ({ context, limit }, onData) => {
  const { Meteor, Collections, Roles } = context();
  const { Jobs } = Collections;

  if (Meteor.subscribe('jobs-list', Number(limit)).ready()) {
    const jobs = Jobs.find({}, {
      sort: {
        updated: -1
      }
    }).fetch();
    const canEdit = Roles.userIsInRole(Meteor.user(), 'superuser');
    onData(null, { canEdit, jobs, limit });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  deleteJob: actions.jobs.deleteJob
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(JobsList);
