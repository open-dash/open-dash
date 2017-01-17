import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import isFuture from 'date-fns/is_future';
import SmartThingsConnect from '../components/connect';

export const composer = ({ context }, onData) => {
  const { Meteor, Settings } = context();

  let authUrl = 'https://graph.api.smartthings.com/oauth/authorize';
  authUrl += '?response_type=code';
  authUrl += '&scope=app';
  authUrl += `&client_id=${Settings.get('smartthings.clientId')}`;
  authUrl += `&redirect_uri=${encodeURIComponent(Meteor.absoluteUrl('auth/smartthings'))}`;

  const user = Meteor.user();

  let smartthingsConnected = false;

  if (user.services && user.services.smartthings) {
    const { token, tokenExpires, endpoint } = user.services.smartthings;
    smartthingsConnected = !!(token && isFuture(tokenExpires) && endpoint);
  }

  onData(null, { authUrl, smartthingsConnected });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SmartThingsConnect);
