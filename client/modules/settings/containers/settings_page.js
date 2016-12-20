import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import SettingsPage from '../components/settings_page';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  const { Settings } = Collections;

  if (Meteor.subscribe('settings').ready()) {
    const settings = Settings.findOne();
    onData(null, { settings });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  update: actions.settings.update
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SettingsPage);
