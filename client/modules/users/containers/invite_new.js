import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import InviteNew from '../components/invite_new';

export const composer = ({ context }, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  sendInvite: actions.invites.sendInvite
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(InviteNew);
