import 'babel-polyfill';
import publications from './publications';
import methods from './methods';
import startup from './startup';

publications();
methods();
Meteor.startup(() => startup());
