import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Logs = new Mongo.Collection('logs');

// Logs.Schema = new SimpleSchema({
//
//   level: {
//     type: String,
//     optional: false
//   },
//
//   hostname: {
//     type: String,
//     optional: true
//   },
//
//   pid: {
//     type: String,
//     optional: true
//   },
//
//   message: {
//     type: String,
//     optional: false
//   },
//
//   data: {
//     type: Object,
//     optional: true,
//     blackbox: true
//   },
//
//   time: {
//     type: Date,
//     optional: true
//   },
//
//   createdAt: {
//     type: Date,
//     label: 'Created',
//     autoValue: function () {
//       if (this.isInsert) {
//         return new Date();
//       } else if (this.isUpsert) {
//         return {
//           $setOnInsert: new Date()
//         };
//       }
//       this.unset();
//     }
//   },
//
//   updatedAt: {
//     type: Date,
//     label: 'Updated',
//     autoValue: function () {
//       if (this.isUpdate) {
//         return new Date();
//       }
//     },
//     denyInsert: true,
//     optional: true
//   }
//
// });

/**
 * Attach schema to Stacks collection
 */
// Logs.attachSchema(Logs.Schema);

/**
 * Deny client side operations by default
 */
Logs.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export default Logs;
