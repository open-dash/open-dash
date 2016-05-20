import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '../components/loading';
import error from '../components/error';
import Dashboard from '../components/dashboard';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('lifx-lights').ready()) {
    const devices = Collections.Devices.find().fetch();
    onData(null, { devices });
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onDeviceToggle: actions.lifx.onDeviceToggle
});

export default composeAll(
  composeWithTracker(composer, loading, error),
  useDeps(depsMapper)
)(Dashboard);
