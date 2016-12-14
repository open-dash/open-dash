import dashboard from './dashboard';
import devices from './devices';
import lifx from './lifx';
import settings from './settings';
import smartthings from './smartthings';
import users from './users';

export default function () {
  dashboard();
  devices();
  lifx();
  settings();
  smartthings();
  users();
}
