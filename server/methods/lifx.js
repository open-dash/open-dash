import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Settings } from '/lib/collections';
import { Color, Lifx, Logger } from '/server/api';

export default function() {

  Meteor.methods({
    'lifx/listLights'(selector) {

      const logger = Logger.child({
        meteor_method: 'lifx/listLights',
        meteor_method_args: selector,
        userId: this.userId
      });

      check(selector, Match.Optional(String));

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Action not allowed!';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      const lifx = new Lifx();

      let res;
      try {
        res = lifx.listLights(selector);
      } catch(e) {
        const msg = 'Lifx API error';
        logger.error(e, msg);
        throw new Meteor.Error(msg);
      }

      return res.data;
    },


    'lifx/togglePower'(selector) {

      const logger = Logger.child({
        meteor_method: 'lifx/togglePower',
        meteor_method_args: selector,
        userId: this.userId
      });

      check(selector, Match.Optional(String));

      if (!Roles.userIsInRole(this.userId, 'admin')) {
        const err = 'AUTH ERROR: Action not allowed!';
        logger.error(err);
        throw new Meteor.Error(err);
      }

      const lifx = new Lifx();

      let res;
      try {
        res = lifx.togglePower(selector);
      } catch(e) {
        const msg = 'Lifx API error';
        logger.error(e, msg);
        throw new Meteor.Error(msg);
      }

      logger.info(`Toggled power for ${selector}`);

      return res.data;
    },


    'color'(num) {
      Logger.info(Color.kelvinToRGB(num));
    }
  });

}
