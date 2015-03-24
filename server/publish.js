Meteor.publish('entries', function() {
  return Entries.find({});
});
Meteor.publish('settings', function() {
  return Settings.find({});
});
