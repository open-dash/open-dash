import { composeWithTracker, composeAll } from 'react-komposer';
import { useDeps } from 'react-simple-di';
import loading from '/client/modules/core/components/loading';
import UserPage from '../components/user_page';

export const composer = ({ context }, onData) => {
  const { Meteor, Users, FlowRouter, LocalState } = context();
  const userId = FlowRouter.getParam('id');

  if (Meteor.subscribe('user-account', userId).ready()) {
    const user = Users.find(userId).fetch()[0];
    const currentUser = Meteor.user();
    const isAdmin = Roles.userIsInRole(currentUser._id, 'superuser');
    const canEdit = isAdmin || userId === currentUser._id;
    const emailError = LocalState.get('EMAIL_CHANGE_ERROR');
    const passwordError = LocalState.get('PASSWORD_CHANGE_ERROR');
    onData(null, { user, canEdit, emailError, passwordError });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  changeEmail: actions.users.changeEmail,
  changePassword: actions.users.changePassword
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(UserPage);
