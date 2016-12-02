import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { Settings } from '/lib/collections';


export default function () {

  Meteor.methods({
    /**
     * Send Slack message if webhook URL is configured
     * @param  {String} message - message for Slack bot to send
     * @return {Object} response from Slack API
     */
    'util/slackMessage'(message) {
      check(message, String);

      const logger = Logger.child({
        meteor_method: 'util/slackMessage',
        meteor_method_args: [message],
        userId: this.userId
      });

      const slackWebhookUrl = Settings.get('slackWebhookUrl');

      if (process.env.SLACK_ENABLED && slackWebhookUrl) {
        logger.info({ message }, 'Sending Slack message');

        return HTTP.call('POST', slackWebhookUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            username: 'Launchdock',
            text: message
          }
        });
      }

      logger.warn({ message }, 'Slack is either not enabled or not configured. Message not sent');

      return true;
    }
  });

}
