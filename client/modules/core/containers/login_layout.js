import { composeWithTracker, composeAll } from 'react-komposer';
import { useDeps } from 'react-simple-di';
import loading from '../components/loading';
import Layout from '../layouts/login_layout';

export const composer = ({ context }, onData) => {
  const { Settings } = context();
  const siteTitle = Settings.get('siteTitle', 'HomeDash');
  onData(null, { siteTitle });
};

export const depsMapper = (context) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, loading),
  useDeps(depsMapper)
)(Layout);
