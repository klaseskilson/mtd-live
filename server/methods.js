Meteor.methods({
  createEntry: function(text, name) {
    Entries.insert({text: text, name: name, createdAt: new Date(), hide: true});
  },
  refreshTwitter: function() {
    console.log('Refreshing twitter feed...');

    var boundRefreshTwitter = Meteor.bindEnvironment(function(err, data, response) {
      // loop over statuses
      _(data.statuses).each(function(status) {
        console.log('Appending tweet to db');
        // console.log(status)
        var now = new Date();
        // insert or update tweets
        if (Entries.findOne({'tweet_id': status.id})) {
          Entries.update({'tweet_id': status.id}, {$set: {tweet: status}});

        } else {
          Entries.insert({createdAt: now, tweet: status, tweet_id: status.id,
            name: status.user.name});
        }
      });
      // console.log('Sample entry: ', Entries.findOne());
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
        q: '#askmtd since:2014-09-01 -filter:retweets',
        count: 20
      },
      // use our apply-method when we recieve the tweets
      boundRefreshTwitter
    );
  },
  setMessage: function(message, mode) {
    Settings.upsert({key: 'message'}, {$set:{value: message, nightmode: mode}});
  },
  setStatus: function(id, status) {
    Entries.update(id, {$set:{hide: status}});
  },
  deleteEntry: function(id, status) {
    Entries.remove(id);
  },
  toggleNightmode: function(value) {
    console.log('setting night mode: ', value);
    Entries.upsert({key: 'nigthmode'}, {$set: {value: value}});
    Entries.findOne({key: 'nigthmode'});
  }
});
