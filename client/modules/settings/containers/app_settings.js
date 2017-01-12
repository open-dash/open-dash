import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import AppSettings from '../components/app_settings';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  const { Settings } = Collections;

  if (Meteor.subscribe('settings').ready()) {
    const settings = Settings.findOne();
    const user = Meteor.user();
    onData(null, { settings, user });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.settings.update,
  userIsInRole: actions.settings.userIsInRole
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AppSettings);
