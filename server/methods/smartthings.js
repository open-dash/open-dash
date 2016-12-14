import addSeconds from 'date-fns/add_seconds';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { Roles } from 'meteor/alanning:roles';
import { Settings, Users } from '/lib/collections';
import { Logger } from '/server/api';


export default function () {

  Meteor.methods({
    'smartthings/auth/getToken'(code) {

      const logger = Logger.child({
        meteor_method: 'smartthings/auth/getCode',
        meteor_method_args: [code],
        userId: this.userId
      });

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Action not allowed!';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      check(code, String);

      const clientId = Settings.get('smartthingsClientId');
      const clientSecret = Settings.get('smartthingsClientSecret');

      if (!clientId || !clientSecret) {
        const msg = 'Missing SmartApp configuration';
        logger.error(msg);
        throw new Meteor.Error('smartthings-auth', msg);
      }

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      const params = {
        code,
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: Meteor.absoluteUrl('auth/smartthings')
      };

      let result;

      try {
        result = HTTP.post('https://graph.api.smartthings.com/oauth/token', { headers, params });
      } catch(e) {
        logger.error(e, 'Error getting token from SmartThings');
        throw new Meteor.Error(e);
      }

      const { access_token, expires_in } = result.data;

      if (!access_token || !expires_in) {
        const msg = 'Something went wrong retrieving the SmartThings token';
        logger.error(msg);
        throw new Meteor.Error('smartthings-auth', msg);
      }

      logger.info('Successfully retrieved SmartThings token');

      let endpoints;

      try {
        endpoints = HTTP.get('https://graph.api.smartthings.com/api/smartapps/endpoints', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
      } catch(e) {
        logger.error(e, 'Error getting endpoint from SmartThings');
        throw new Meteor.Error(e);
      }

      logger.info({ result: endpoints.data[0] }, 'SmartThings endpoints retrieved');

      const { location, uri, base_url, url, oauthClient } = endpoints.data[0];

      Users.update({ _id: this.userId }, {
        $set: {
          'services.smartthings.token': access_token,
          'services.smartthings.tokenExpires': addSeconds(new Date(), Number(expires_in)),
          'services.smartthings.oauthClientId': oauthClient.clientId,
          'services.smartthings.location': location,
          'services.smartthings.endpoint.uri': uri,
          'services.smartthings.endpoint.baseUrl': base_url,
          'services.smartthings.endpoint.path': url
        }
      });

      return true;
    }
  });

}
