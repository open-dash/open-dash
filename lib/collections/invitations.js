const Invitations = new Mongo.Collection('invitations');

Invitations.Schema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email'
  },
  token: {
    type: String,
    label: 'Invitation token'
  },
  role: {
    type: String,
    label: 'Role'
  },
  invitedBy: {
    type: String,
    label: 'Invited by'
  },
  accepted: {
    type: Boolean,
    label: 'Accepted',
    defaultValue: false
  },
  acceptedDate: {
    type: Date,
    label: 'Accepted Date',
    optional: true
  },
  userId: {
    type: String,
    label: 'User ID',
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

Invitations.attachSchema(Invitations.Schema);

/**
 * Deny client side operations by default
 */
Invitations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export default Invitations;
