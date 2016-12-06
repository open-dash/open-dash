import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '/client/modules/core/components/loading';
import error from '/client/modules/core/components/error';
import Panel from '../components/panel';

export const composer = ({ context }, onData) => {
  const { Meteor, Devices } = context();
  if (Meteor.subscribe('lifx-lights').ready()) {
    const devices = Devices.find().fetch();
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
)(Panel);
