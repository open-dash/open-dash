import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Settings, Users } from '/lib/collections';
import { Logger } from '/server/api';

/**
 * Send an email to ALL admins
 * @param  {String}  subject - the email subject line
 * @param  {String}  content - value can be text or HTML
 * @param  {Boolean} isHtml  - (default: false) must be set to true to send HTML email
 */

export function emailAdmins(subject, content, isHtml = true) {

  if (!process.env.MAIL_URL) {
    Logger.error('[Email]: No MAIL_URL configured.');
    return;
  }

  // set from email
  const fromEmail = Settings.get('adminEmail', 'admin@localhost');

  // find all admins
  const admins = Users.find({ roles: { $in: ['superuser'] } }).fetch();

  // send the email to each admin
  admins.forEach((admin) => {
    const toEmail = admin.emails[0].address;

    const options = {
      to: toEmail,
      from: fromEmail,
      subject: subject
    };

    if (isHtml) {
      options.html = content;
    } else {
      options.text = content;
    }

    Meteor.defer(() => {
      Email.send(options);
    });

    Logger.info(`Admin notification email sent to ${toEmail}`);
  });

}
