import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Color, Logger } from '/server/api';

export default function() {

  Meteor.methods({

    'color/kelvinToRGB'(kelvin) {
      const logger = Logger.child({
        meteor_method: 'color/kelvinToRGB',
        meteor_method_args: kelvin,
        userId: this.userId
      });

      check(kelvin, Match.OneOf(String, Number));

      // if (!Roles.userIsInRole(this.userId, 'admin')) {
      //   const err = 'AUTH ERROR: Action not allowed!';
      //   logger.error(err);
      //   throw new Meteor.Error(err);
      // }

      return Color.kelvinToRGB(kelvin);
    },


    'color/rgbToKelvin'(rgb) {
      const logger = Logger.child({
        meteor_method: 'color/rgbToKelvin',
        meteor_method_args: rgb,
        userId: this.userId
      });

      check(rgb, {
        r: Match.OneOf(String, Number),
        g: Match.OneOf(String, Number),
        b: Match.OneOf(String, Number)
      });

      // if (!Roles.userIsInRole(this.userId, 'admin')) {
      //   const err = 'AUTH ERROR: Action not allowed!';
      //   logger.error(err);
      //   throw new Meteor.Error(err);
      // }

      return Color.rgbToKelvin(rgb);
    }
  });

}
