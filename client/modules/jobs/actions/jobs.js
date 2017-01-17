
export default {
  deleteJob({ Meteor, Alert, Notify }, job, noPrompt) {
    function deleteJob() {
      Meteor.call('jobs/remove', job._id, (err) => {
        if (err) {
          Alert.error({
            title: 'Oops!',
            text: `Something went wrong deleting the job. ${err.reason.toString()}`
          });
        }
        if (!noPrompt) {
          Notify.success('Job deleted!');
        }
      });
    }

    if (noPrompt) {
      deleteJob();
    } else {
      Alert.confirm({
        title: 'Are you sure?',
        text: 'There\'s no going back!'
      }, () => {
        deleteJob();
      });
    }
  }
};
