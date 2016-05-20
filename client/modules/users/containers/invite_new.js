import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '/client/modules/core/components/loading';
import InviteNew from '../components/invite_new';

export const composer = ({ context }, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  sendInvite: actions.invites.sendInvite
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(InviteNew);
