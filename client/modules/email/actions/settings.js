import Alert from 'sweetalert2';

export default {
  saveSettings({ Notify }, settings, callback) {
    const { service, host, port, user, pass } = settings;

    if (!service) {
      Notify.error('Service is required!');
      return callback();
    }

    if (service !== 'custom' && (!user || !pass)) {
      Notify.error('User and password are required!');
      return callback();
    }

    if (service === 'custom') {
      if (!host || !port || !user || !pass) {
        Notify.error('All fields are required for a custom provider!');
        return callback();
      }

      // make sure port is a Number
      settings.port = Number(settings.port);

      if (isNaN(settings.port)) {
        Notify.error('Port must be a number!');
        return callback();
      }
    }

    const save = () => {
      Meteor.call('email/saveSettings', settings, (err) => {
        if (err) {
          return Notify.error(`ERROR: ${err.reason}`);
        }
        return Notify.success('Settings saved!');
      });
    };

    // check if the settings work first
    Meteor.call('email/verifySettings', settings, (error) => {
      callback();
      // if the connection fails
      if (error) {
        Alert({
          title: 'Connection Failed',
          text: 'Save settings anyway?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Save'
        }).then(() => save()).catch(() => true);
      } else {
        save();
      }
    });

    return true;
  }
};
