import { Accounts } from 'meteor/accounts-base';

export default {

  changeEmail({ FlowRouter, LocalState, Meteor, Notify }, email, callback) {
    LocalState.set('EMAIL_CHANGE_ERROR', null);

    if (!email) {
      return LocalState.set('EMAIL_CHANGE_ERROR', 'Email must not be blank');
    }

    const userId = FlowRouter.getParam('id');

    Meteor.call('changeUserEmail', { userId, email }, (error) => {
      if (error) {
        LocalState.set('EMAIL_CHANGE_ERROR', error.reason);
        return callback(error);
      }
      Notify.success('Email successfully updated!', 'top-right');
      callback(null);
    });
  },

  changePassword({ LocalState, Notify }, oldPass, newPass1, newPass2, callback) {
    LocalState.set('PASSWORD_CHANGE_ERROR', null);

    if (newPass1 !== newPass2) {
      return LocalState.set('PASSWORD_CHANGE_ERROR', 'Passwords do not match');
    }

    Accounts.changePassword(oldPass, newPass1, (error) => {
      if (error) {
        LocalState.set('PASSWORD_CHANGE_ERROR', error.reason);
        callback(error);
        return Notify.error(`ERROR: ${error.reason}`);
      }
      Notify.success('Password successfully updated!');
      callback(null);
    });
  },

  deleteUser({ Meteor, Alert, Notify }, userId) {
    Alert.confirm({
      title: 'Are you sure?',
      text: 'There\'s no going back!'
    }, () => {
      Meteor.call('deleteInvitedUser', userId, (err) => {
        if (err) {
          Alert.error({
            title: 'Oops!',
            text: `Something went wrong deleting the user. <br> ${err}`
          });
        } else {
          Notify.success('User deleted!');
        }
      });
    });
  }

};
