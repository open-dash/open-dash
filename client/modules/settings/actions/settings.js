import { Settings } from '/lib/collections';

export default {

  update({ Notify }, settings) {
    Meteor.call('settings/update', settings, (err, res) => {
      if (err) {
        Notify.error('Oops! Something went wrong.');
        throw new Error(err);
      }
      Notify.success('Settings saved!', 'top-right');
    });
  }

};
