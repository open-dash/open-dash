import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Settings } from '/lib/collections';
import analytics from './snippet';

export default function () {
  // initialize Segment libs and identify the user (once they're logged in)
  Tracker.autorun((c) => {
    const segmentKey = Settings.get('segmentKey');

    if (segmentKey) {
      analytics.load(segmentKey);
      const user = Meteor.user();

      if (!user) {
        return;
      }

      window.analytics.identify(user._id, {
        email: user.emails[0].address,
        username: user.username,
        roles: user.roles
      });

      c.stop();
    }
  });
}
