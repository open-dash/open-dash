import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import InviteAccept from '../components/invite_accept';

export const composer = ({ context, token }, onData) => {
  const { Meteor, Invitations, LocalState } = context();

  if (Meteor.subscribe('invite', token).ready()) {
    const invite = Invitations.find({ token }).fetch()[0];
    const error = LocalState.get('ACTIVATE_INVITE_ERROR');
    onData(null, { invite, error });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  acceptInvite: actions.invites.acceptInvite
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(InviteAccept);
