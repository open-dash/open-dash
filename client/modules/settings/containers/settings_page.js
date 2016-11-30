import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import loading from '/client/modules/core/components/loading';
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

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(SettingsPage);
