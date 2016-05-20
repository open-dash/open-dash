import color from './color';
import lifx from './lifx';
import settings from './settings';
import users from './users';
import utils from './utils';

export default function() {
  color();
  lifx();
  settings();
  users();
  utils();
}
