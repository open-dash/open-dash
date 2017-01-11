import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import DevicePage from '../components/device_page';

export const composer = ({ context, _id }, onData) => {
  const { Meteor, Devices } = context();

  if (Meteor.subscribe('device', _id).ready()) {
    const device = Devices.findOne({ _id });
    onData(null, { device });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DevicePage);
