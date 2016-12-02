import { Settings } from '/lib/collections';

export default function () {
  /**
   * Custom email configs
   */
  const siteTitle = Settings.get('siteTitle', 'HomeDash');
  const fromEmail = Settings.get('adminEmail', 'admin@localhost');


  // global
  Accounts.emailTemplates.siteName = siteTitle;
  Accounts.emailTemplates.from = `${siteTitle} <${fromEmail}>`;


  // enroll account
  Accounts.emailTemplates.enrollAccount.subject = (user) => {
    return `You\'ve been invited to ${siteTitle}!`;
  };

  Accounts.emailTemplates.enrollAccount.html = (user, url) => {
    SSR.compileTemplate('admin-enroll', Assets.getText('server/templates/enrollment.html'));
    let html = SSR.render('admin-enroll', { url });
    return html;
  };


  // verifyEmail
  Accounts.emailTemplates.verifyEmail.subject = (user) => {
    return `Welcome to ${siteTitle}! Just one more step...`;
  };

  // Accounts.emailTemplates.verifyEmail.html = (user, url) => {
  //   SSR.compileTemplate('verify-email', Assets.getText('server/templates/verify_email.html'));
  //   let html = SSR.render('verify-email', { url });
  //   return html;
  // };


  // reset password
  Accounts.emailTemplates.resetPassword.subject = (user) => {
    return `Reset your ${siteTitle} password`;
  };

  // Accounts.emailTemplates.resetPassword.html = (user, url) => {
  //   SSR.compileTemplate('password-reset', Assets.getText('server/templates/password_reset.html'));
  //   let html = SSR.render('password-reset', { url });
  //   return html;
  // };
}
