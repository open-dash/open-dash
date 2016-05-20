import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '/client/modules/core/components/loading';
import InviteAccept from '../components/invite_accept';

export const composer = ({ context, token }, onData) => {
  const { Meteor, Collections, LocalState } = context();

  if (Meteor.subscribe('invite', token).ready()) {
    const invite = Collections.Invitations.find({ token }).fetch()[0];
    const error = LocalState.get('ACTIVATE_INVITE_ERROR');
    onData(null, { invite, error });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  acceptInvite: actions.invites.acceptInvite
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(InviteAccept);
