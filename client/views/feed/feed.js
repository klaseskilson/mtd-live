Meteor.subscribe('entries');

Template.feed.helpers({
  entries: function() {
    return Entries.find({}, {sort: {createdAt: -1}});
  }
});
