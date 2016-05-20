import * as Collections from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { Notify, Alert } from '/client/modules/core/configs/notifications';

export default function() {
  return {
    Meteor,
    Roles,
    FlowRouter,
    Collections,
    Tracker,
    Notify,
    Alert,
    SubsManager,
    LocalState: new ReactiveDict()
  };
}
