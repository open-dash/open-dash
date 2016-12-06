import security from './security';
import seed from './seed';
import { Settings } from '/lib/collections';

export default function () {
  security();
  seed();

  // connect to Kadira in production (if configured)
  // https://kadira.io
  if (process.env.NODE_ENV === 'production') {
    const kadiraAppId = Settings.get('kadiraAppId');
    const kadiraAppSecret = Settings.get('kadiraAppSecret');

    if (kadiraAppId && kadiraAppSecret) {
      Kadira.connect(kadiraAppId, kadiraAppSecret);
    }
  }
}
