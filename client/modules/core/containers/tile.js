import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import Tile from '../components/ui/tile';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Tile);
