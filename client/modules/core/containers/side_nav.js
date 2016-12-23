import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import SideNav from '../components/side_nav';

export const composer = ({ context }, onData) => {
  const { Meteor, Settings } = context();

  if (Meteor.subscribe('settings').ready()) {
    const siteTitle = Settings.get('app.title');
    const user = Meteor.user();

    onData(null, { siteTitle, user });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SideNav);
