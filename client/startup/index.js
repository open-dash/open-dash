import analytics from '/client/api/analytics';

Meteor.startup(() => {
  analytics();
});
