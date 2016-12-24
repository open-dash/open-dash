export default {

  sendInvite({ Meteor, Roles, Notify }, email, role) {
    const isManager = Roles.userIsInRole(Meteor.userId(), 'manager');

    const options = {
      email,
      role: isManager ? 'viewer' : role
    };

    if (options.email && options.role) {
      Meteor.call('users/sendInvite', options, (err) => {
        if (err) {
          Notify.error(err.reason);
        } else {
          Notify.success('Invitation sent!');
        }
      });
    } else {
      Notify.warn('Please set an email and at least one role!');
    }
  },

  acceptInvite({ Meteor, FlowRouter, Notify, LocalState }, options) {
    LocalState.set('ACTIVATE_INVITE_ERROR', null);

    const { username, email, password, password2 } = options;

    if (!username) {
      return LocalState.set('ACTIVATE_INVITE_ERROR', 'Please choose a username');
    }

    if (!password) {
      return LocalState.set('ACTIVATE_INVITE_ERROR', 'Password is required');
    }

    if (password !== password2) {
      return LocalState.set('ACTIVATE_INVITE_ERROR', 'Passwords do not match');
    }

    const inviteToken = FlowRouter.getParam('token');

    if (!inviteToken) {
      return Notify.error('Invite not found!');
    }

    Meteor.call('activateUserInvite', { username, email, password, inviteToken }, (err) => {
      if (err) {
        return LocalState.set('ACTIVATE_INVITE_ERROR', err.reason);
      }
      Meteor.loginWithPassword(email, password, (error) => {
        if (!error) {
          FlowRouter.go('/');
          Notify.success('Success!', 'bottom-right');
        }
      });
    });
  },

  revokeInvite({ Meteor, Alert, Notify }, inviteId) {
    if (!inviteId) {
      return Notify.error('ERROR: No invite ID provided');
    }

    Alert.confirm({
      title: 'Are you sure?',
      text: 'There\'s no going back!'
    }, () => {
      Meteor.call('revokeInvitation', inviteId, (err) => {
        if (err) {
          Alert.error({
            title: 'Error!',
            text: err.reason
          });
        } else {
          Notify.success('Invitation revoked!', 'top-right');
        }
      });
    });
  }
};
