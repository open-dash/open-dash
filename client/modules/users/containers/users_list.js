import { composeWithTracker, composeAll } from 'react-komposer';
import { useDeps } from 'react-simple-di';
import loading from '/client/modules/core/components/loading';
import UsersList from '../components/users_list';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, Roles } = context();
  const { Users, Invitations } = Collections;

  if (Meteor.subscribe('accounts-management').ready()) {
    const users = Users.find().fetch();
    const invites = Invitations.find().fetch();

    const canDelete = (userId) => {
      const currentUserId = Meteor.userId();
      const isAdmin = Roles.userIsInRole(currentUserId, 'superuser');
      return isAdmin && userId !== currentUserId;
    };

    onData(null, { users, invites, canDelete });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  deleteUser: actions.users.deleteUser
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(UsersList);
