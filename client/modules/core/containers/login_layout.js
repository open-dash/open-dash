import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import Layout from '../layouts/login_layout';

export const composer = ({ context }, onData) => {
  const { Settings } = context();
  const siteTitle = Settings.get('app.title', 'HomeDash');
  onData(null, { siteTitle });
};

export const depsMapper = (context) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Layout);
