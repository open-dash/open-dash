import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '/client/modules/core/components/loading';
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

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(SmartThingsDevices);
