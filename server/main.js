import emailConfig from './email/config';
import publications from './publications';
import methods from './methods';
import startup from './startup';

emailConfig();
publications();
methods();
Meteor.startup(() => startup());
