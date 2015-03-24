Template.question.events({
  'submit .js-new-entry': function (event) {
    var entry = event.target.entry.value;
    var name = event.target.name.value;

    // call to server
    Meteor.call('createEntry', entry, name);
    event.target.entry.value = '';

    // prevent form from submitting
    return false;
  }
});
