import { Random } from 'meteor/random';
import { Settings, Users } from '/lib/collections';
import { Logger } from '/server/api';
import { send } from './actions';


/**
 * Render an HTML template
 * @param {String} template - path to html file (relative to /private)
 * @param {Object} options - the email subject line
 * @return {String} returns rendered html string
 */
export function renderTemplate(template, options = {}) {
  const templateId = Random.id();
  SSR.compileTemplate(templateId, Assets.getText(template));
  return SSR.render(templateId, options);
}


/**
 * Send an email to ALL admins
 * @param {String}  role - the role of users that should be notified
 * @param {String}  subject - the email subject line
 * @param {String}  html - the email body - value can be text or HTML
 * @return {Boolean} returns true on success
 */
export function notifyUsersInRole(role = 'superuser', subject, html) {
  // set the "from" email
  const from = Settings.get('app.adminEmail', 'no-reply@localhost');

  // email all admins
  Users.find({ roles: { $in: [role] } }).forEach((admin) => {
    const to = admin.emails[0].address;
    const options = { to, from, subject, html };

    send(options);

    Logger.info(`Admin notification email sent to ${to}`);
  });

  return true;
}
