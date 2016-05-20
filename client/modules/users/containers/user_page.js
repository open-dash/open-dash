import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '/client/modules/core/components/loading';
import UserPage from '../components/user_page';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter, LocalState } = context();
  const userId = FlowRouter.getParam('id');

  if (Meteor.subscribe('user-account', userId).ready()) {
    const user = Collections.Users.find(userId).fetch()[0];
    const currentUser = Meteor.user();
    const isAdmin = Roles.userIsInRole(currentUser._id, 'superuser');
    const canEdit = isAdmin || userId === currentUser._id;
    const error = LocalState.get('PASSWORD_CHANGE_ERROR');
    onData(null, { user, canEdit, error });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  changePassword: actions.users.changePassword
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(UserPage);
