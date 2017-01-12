import color from './color';
import email from './email';
import lifx from './lifx';
import settings from './settings';
import smartthings from './smartthings';
import users from './users';
import utils from './utils';

export default function () {
  color();
  email();
  lifx();
  settings();
  smartthings();
  users();
  utils();
}
