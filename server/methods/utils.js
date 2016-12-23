import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { Settings } from '/lib/collections';


export default function () {

  Meteor.methods({
    /**
     * Send Slack message if webhook URL is configured
     * @param  {String} text - message for Slack bot to send
     * @return {Object} response from Slack API
     */
    'util/slackMessage'(text) {
      check(text, String);

      const logger = Logger.child({
        meteor_method: 'util/slackMessage',
        meteor_method_args: [text],
        userId: this.userId
      });

      const slackWebhookUrl = Settings.get('slack.webhookUrl');
      const username = Settings.get('app.title', 'HomeDash');

      if (process.env.SLACK_ENABLED && slackWebhookUrl) {
        logger.info({ text }, 'Sending Slack message');

        return HTTP.call('POST', slackWebhookUrl, {
          headers: {
            'Content-Type': 'application/json'
          },
          data: { username, text }
        });
      }

      logger.warn({ text }, 'Slack is either not enabled or not configured. Message not sent');

      return true;
    }
  });

}
