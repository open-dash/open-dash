import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import isFuture from 'date-fns/is_future';
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

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SmartThingsDashboard);
