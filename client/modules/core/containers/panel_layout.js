import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '../components/loading';
import Layout from '../layouts/panel_layout';

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

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(Layout);
