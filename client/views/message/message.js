Meteor.subscribe('settings');

Template.message.helpers({
  big_message: function () {
    console.log(Settings.findOne({key: 'message'}));
    return Settings.findOne({key: 'message'}).value;
  }
});
