import { FlowRouter } from 'meteor/kadira:flow-router';

export default function () {
  // pageview tracking
  FlowRouter.triggers.enter([
    (context) => {
      const { path, name } = context.route;
      const baseUrl = Meteor.absoluteUrl().slice(0, -1);
      const url = baseUrl + path;
      const referrer = context.oldRoute ? baseUrl + context.oldRoute.path : undefined;

      window.analytics.page(name, { path, url, referrer });
    }
  ]);
}
