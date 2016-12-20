import { useDeps } from 'react-simple-di';
import { composeWithTracker, merge } from '/client/api';
import Tile from '../components/ui/tile';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default merge(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Tile);
