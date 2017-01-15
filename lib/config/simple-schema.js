import SimpleSchema from 'simpl-schema';
import { Match } from 'meteor/check';

export default function () {
  // Extend the default SimpleSchema options
  SimpleSchema.extendOptions({
    private: Match.Optional(Boolean),
    public: Match.Optional(Boolean)
  });
}
