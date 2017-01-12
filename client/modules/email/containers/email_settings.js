import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import EmailSettings from '../components/email_settings';

const providers = Object.keys(require('nodemailer-wellknown/services.json'));

const composer = ({ context }, onData) => {
  const { Meteor, Settings } = context();

  if (Meteor.subscribe('settings').ready()) {
    const settings = Settings.get('mail', {});
    const { service, host, port, user, pass } = settings;

    if (host && port && user && pass && !service) {
      settings.service = 'custom';
    }

    delete settings.smtpUrl;

    onData(null, { providers, settings });
  }
};

const depsMapper = (context, actions) => ({
  context: () => context,
  saveSettings: actions.emailSettings.saveSettings
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(EmailSettings);
