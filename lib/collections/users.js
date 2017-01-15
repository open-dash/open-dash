import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';


const Users = Meteor.users;

/**
 * Subscription schema
 * @type {SimpleSchema}
 */
const subscriptionSchema = new SimpleSchema({
  plan: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status: {
    type: String,
    optional: true
  },
  created: {
    type: Date,
    optional: true
  },
  next_payment: {
    type: Date,
    optional: true
  }
});


/**
 * Users schema
 * @type {SimpleSchema}
 */
Users.Schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },

  username: {
    type: String,
    optional: true
  },

  emails: {
    type: Array,
    optional: true
  },

  'emails.$': {
    type: Object,
    optional: true
  },

  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },

  'emails.$.verified': {
    type: Boolean,
    optional: true
  },

  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },

  roles: {
    type: Array,
    optional: true
  },

  'roles.$': {
    type: String,
    optional: true
  },

  stripe: {
    type: Object,
    optional: true
  },

  'stripe.customerId': {
    type: String,
    optional: true
  },

  'stripe.created': {
    type: Date,
    optional: true
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  status: {
    type: Object,
    optional: true,
    blackbox: true
  },

  subscription: {
    type: subscriptionSchema,
    optional: true
  },

  createdAt: {
    type: Date,
    label: 'Created',
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      }
      this.unset();
    }
  },

  updatedAt: {
    type: Date,
    label: 'Updated',
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }

});

/**
 * Attach schema to Meteor.users collection
 */
Users.attachSchema(Users.Schema);

/**
 * Deny client side operations by default
 */
Users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export default Users;
