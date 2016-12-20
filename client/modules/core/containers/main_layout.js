import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import Layout from '../layouts/main_layout';

export const composer = ({ context }, onData) => {
  const { Meteor, FlowRouter, Collections } = context();
  const { Settings } = Collections;

  if (Meteor.subscribe('users-count').ready()) {
    const siteTitle = Settings.get('siteTitle', 'HomeDash');
    const user = Meteor.user();
    if (!user && !Meteor.loggingIn()) {
      return FlowRouter.redirect('/login');
    }

    onData(null, { siteTitle, user });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Layout);
