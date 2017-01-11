import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import DevicesList from '../components/devices_list';

export const composer = ({ context }, onData) => {
  const { Meteor, Devices } = context();

  if (Meteor.subscribe('devices').ready()) {

    const devices = Devices.find({
      userId: Meteor.userId()
    }).fetch() || [];

    onData(null, { devices });
  }

  Meteor.subscribe('smartthings-poll');
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(DevicesList);
