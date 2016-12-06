export default {

  onDeviceToggle({ Meteor, Notify }, id) {
    Meteor.call('lifx/togglePower', `id:${id}`, (err) => {
      if (err) {
        Notify.error(err.error);
      }
    });
  }

};
