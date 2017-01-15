import email from './email';
import jobs from './jobs';
import security from './security';
import seed from './seed';
import { Settings } from '/lib/collections';

export default function () {
  email();
  jobs();
  security();
  seed();

  // connect to Kadira in production (if configured)
  // https://kadira.io
  if (process.env.NODE_ENV === 'production') {
    const { appId, appSecret } = Settings.get('kadira', {});

    if (appId && appSecret) {
      Kadira.connect(appId, appSecret);
    }
  }
}
