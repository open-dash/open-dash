import { composeWithTracker, composeAll } from 'react-komposer';
import { useDeps } from 'react-simple-di';
import loading from '/client/modules/core/components/loading';
import InvitesList from '../components/invites_list';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, Roles } = context();
  const { Invitations } = Collections;

  if (Meteor.subscribe('accounts-management').ready()) {
    const invites = Invitations.find().fetch();
    const canRevoke = Roles.userIsInRole(Meteor.userId(), 'admin');
    onData(null, { invites, canRevoke });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  revokeInvite: actions.invites.revokeInvite
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(InvitesList);
