Meteor.subscribe('entries');
Meteor.subscribe('settings');

Template.admin.helpers({
  message: function () {
    return Settings.findOne({key: 'message'});
  },
  feed: function() {
    return Entries.find({$or: [
            { "tweet": { $exists: false } },
            { "tweet": null }
          ]});
  },
  nightMode: function() {
    console.log(Settings.findOne({key: 'nigthmode'}), Settings.findOne({key: 'nigthmode'}).value);
    return Settings.findOne({key: 'nigthmode'}).value;
  }
});

Template.admin.events({
  'submit .js-message': function(event) {
    event.preventDefault();
    Meteor.call('setMessage', event.target.message.value, event.target.mode.checked);
  },
  'click .js-update-twitter': function() {
    Meteor.call('refreshTwitter');
  }
});

Template.admin_entry.events({
  'click .js-toggle': function() {
    Meteor.call('setStatus', this._id, !this.hide);
  },
  'click .js-delete': function() {
    Meteor.call('deleteEntry', this._id);
  }
});
