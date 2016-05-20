import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { Settings } from '/lib/collections';


export default function() {

  Meteor.methods({
    /**
     * Send Slack message if webhook URL is configured
     * @param  {String} message - message for Slack bot to send
     * @return {Object} response from Slack API
     */
    'util/slackMessage'(message) {
      check(message, String);

      const slackWebhookUrl = Settings.get('slackWebhookUrl');

      if (process.env.SLACK_ENABLED && slackWebhookUrl) {
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
    }
  });

}
