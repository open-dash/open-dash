import dashboard from './dashboard';
import devices from './devices';
import settings from './settings';
import users from './users';

export default function () {
  dashboard();
  devices();
  settings();
  users();
}
