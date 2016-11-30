export default {

  update({ Meteor, Notify }, settings) {
    Meteor.call('settings/update', settings, (err) => {
      if (err) {
        Notify.error('Oops! Something went wrong.');
        throw new Error(err);
      }
      Notify.success('Settings saved!', 'top-right');
    });
  }

};
