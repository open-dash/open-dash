import { Settings } from '/lib/collections';

export default function () {
  // update the MAIL_URL any time the setting doc changes
  Settings.find().observe({
    added(doc) {
      if (doc.mail && doc.mail.smtpUrl) {
        process.env.MAIL_URL = doc.mail.smtpUrl;
      }
    },
    changed(newDoc) {
      if (newDoc.mail && newDoc.mail.smtpUrl) {
        process.env.MAIL_URL = newDoc.mail.smtpUrl;
      }
    }
  });
}
