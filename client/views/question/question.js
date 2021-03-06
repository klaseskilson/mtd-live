Template.question.events({
  'submit .js-new-entry': function (event) {
    event.preventDefault();
    var entry = event.target.entry.value;
    var name = event.target.name.value;

    var NonEmptyString = Match.Where(function (x) {
      check(x, String);
      return x.length > 4;
    });

    try {
      check(entry, NonEmptyString);
      check(name, NonEmptyString);
    } catch (e) {
      console.error(e);
      return;
    }

    // call to server
    Meteor.call('createEntry', entry, name);
    event.target.entry.value = '';

    // prevent form from submitting
    return false;
  }
});
