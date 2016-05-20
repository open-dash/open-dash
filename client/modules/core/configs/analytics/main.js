import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Settings } from '/lib/collections';
import analytics from './snippet';

Meteor.startup(() => {

  // initialize Segment libs and identify the user (once they're logged in)
  FlowRouter.subsReady('settings', () => {
    const segmentKey = Settings.get('segmentKey');

    if (segmentKey) {
      analytics.load(segmentKey);

      Tracker.autorun((c) => {
        const user = Meteor.user();

        if (!user) {
          return;
        }

        window.analytics.identify(user._id, {
          email: user.emails[0].address,
          username: user.username,
          type: 'admin'
        });

        c.stop();
      });
    }
  });

});
