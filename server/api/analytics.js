import Analytics from 'analytics-node';
import Logger from './logger';
import { Settings } from '/lib/collections';

export default function initAnalytics() {
  const segmentKey = Settings.get('segmentKey');

  let analytics;

  if (segmentKey) {
    analytics = new Analytics(segmentKey, {
      flushAt: 0,
      flushAfter: 5000
    });
  } else {
    analytics = {
      identify() {
        Logger.warn({ data: arguments }, 'Analtyics not configured. Not tracking events!');
      },
      track() {
        Logger.warn({ data: arguments }, 'Analtyics not configured. Not tracking events!');
      }
    };
  }

  return analytics;
}

Settings.find().observe({
  // If the default settings doc has the Segment key, initialize the lib.
  // This will always fire on app startup if the key is there.
  added(doc) {
    if (doc.segmentKey) {
      Logger.info('Segment analytics initialized.');
    } else {
      Logger.warn('No Segment key found in settings. Analytics not initialized.');
    }
  },
  // if the key has changed, re-initialize
  changed(newDoc, oldDoc) {
    if (newDoc.segmentKey !== oldDoc.segmentKey) {
      Logger.info('Segment API key changed.');
    }
  }
});
