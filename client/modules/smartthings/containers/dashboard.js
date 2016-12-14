import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import isFuture from 'date-fns/is_future';
import loading from '/client/modules/core/components/loading';
import SmartThingsDashboard from '../components/dashboard';

export const composer = ({ context }, onData) => {
  const { Meteor } = context();

  const user = Meteor.user();

  let smartthingsConnected = false;

  if (user.services && user.services.smartthings) {
    const { token, tokenExpires, endpoint } = user.services.smartthings;
    smartthingsConnected = !!(token && isFuture(tokenExpires) && endpoint);
  }

  onData(null, { smartthingsConnected });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(SmartThingsDashboard);
