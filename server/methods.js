Meteor.methods({
  createEntry: function(text, name) {
    Entries.insert({text: text, name: name, createdAt: new Date()})
  },
  refreshTwitter: function() {
    console.log('Refreshing twitter feed...');

    var boundRefreshTwitter = Meteor.bindEnvironment(function(err, data, response) {
      // loop over statuses
      _(data.statuses).each(function(status) {
        console.log('Appending tweet to db');
        console.log(status)
        var now = new Date();
        // insert or update tweets
        if (Entries.findOne({'tweet_id': status.id})) {
          Entries.update({'tweet_id': status.id}, {$set: {tweet: status}});

        } else {
          Entries.insert({createdAt: now.getTime(), tweet: status, tweet_id: status.id,
            name: status.user.name});
        }
      });
      console.log('Sample entry: ', Entries.findOne());
      // set next update url
      // Settings.upsert({key: 'twitter'}, {$set: {refresh_url: data.refresh_url}});
    }, function(e) {
      console.log('Failed boundRefreshTwitter');
      // something went wrong
      throw e;
    });

    // collect tweets
    Twit.get('search/tweets',
      {
        q: '#MTD2015 OR #askmtd since:2014-09-01',
        count: 20
      },
      // use our apply-method when we recieve the tweets
      boundRefreshTwitter
    );
  }
});
