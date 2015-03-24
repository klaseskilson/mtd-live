Meteor.subscribe('settings');

Template.message.helpers({
  big_message: function () {
    return Settings.findOne({key: 'message'});
  }
});
