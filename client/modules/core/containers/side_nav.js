import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import loading from '../components/loading';
import SideNav from '../components/side_nav';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  const { Settings } = Collections;

  const siteTitle = Settings.get('siteTitle', 'Wally');
  const user = Meteor.user();

  onData(null, { siteTitle, user });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(SideNav);
