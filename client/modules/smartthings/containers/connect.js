import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import isFuture from 'date-fns/is_future';
import loading from '/client/modules/core/components/loading';
import SmartThingsConnect from '../components/connect';

export const composer = ({ context }, onData) => {
  const { Meteor, Settings } = context();

  let authUrl = 'https://graph.api.smartthings.com/oauth/authorize';
  authUrl += '?response_type=code';
  authUrl += '&scope=app';
  authUrl += `&client_id=${Settings.get('smartthingsClientId')}`;
  authUrl += `&redirect_url=${encodeURIComponent(Meteor.absoluteUrl('auth/smartthings'))}`;

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

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(SmartThingsConnect);
