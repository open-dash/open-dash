import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import SmartThingsDevices from '../components/devices';

export const composer = ({ context }, onData) => {
  const { Meteor, Devices } = context();

  if (Meteor.subscribe('smartthings-devices').ready()) {

    const devices = Devices.find({
      provider: 'SmartThings',
      userId: Meteor.userId()
    }).fetch();

    onData(null, { devices });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SmartThingsDevices);
