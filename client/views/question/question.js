Template.question.events({
  'submit .new-entry': function (event) {
    var text = event.target.entry.value;

    // call to server
    Meteor.call('createEntry', text, 'hahah');
    event.target.entry.value = '';

    // prevent form from submitting
    return false;
  }
});
