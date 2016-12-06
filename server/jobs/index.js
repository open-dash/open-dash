import cleanup from './cleanup';
import email from './email';

export default function () {
  cleanup();
  email();
}
