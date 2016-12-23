import { Meteor } from 'meteor/meteor';
import analytics from '/client/api/analytics';

Meteor.startup(() => {
  analytics();
});
