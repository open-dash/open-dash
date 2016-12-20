import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
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

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Panel);
