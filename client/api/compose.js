import React from 'react';
import { compose } from 'react-komposer';
import Loading from '/client/modules/core/components/loading';

/**
 * getTrackerLoader creates a Meteor Tracker to watch dep updates from
 * passed in reactiveMapper funtion
 * @param  {Function} reactiveMapper data fetching function to bind to a tracker
 * @return {Function} composed function
 */
function getTrackerLoader(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if (typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}

/**
 * Re-implementation of composeWithTracker from v1.x
 * @param {Function} reactiveMapper - data fetching function to bind to a tracker
 * @return {Function} composed function
 */
export function composeWithTracker(reactiveMapper) {
  const options = {
    loadingHandler: () => (<Loading/>)
  };
  return compose(getTrackerLoader(reactiveMapper), options);
}

export * from 'react-komposer';
