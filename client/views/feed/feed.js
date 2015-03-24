Meteor.subscribe('entries');

String.prototype.parseURL = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
    return url.link(url);
  });
};
String.prototype.parseUsername = function() {
  return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
    var username = u.replace("@","")
    return u.link("http://twitter.com/"+username);
  });
};
String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-ZÅÄÖa-zåäö0-9-_]+/g, function(t) {
    var tag = t.replace("#","%23")
    return t.link("http://twitter.com/search?q="+tag);
  });
};

Template.feed.helpers({
  entries: function() {
    return Entries.find({
      $or: [
        { "hide": { $exists: false } },
        { "hide": null },
        { "hide": false }
      ]}, {sort: {createdAt: -1}, limit: 50});
  }
});

Template.entry.helpers({
  parseTweet: function() {
    return this.tweet.text.parseURL().parseUsername().parseHashtag();
  },
  getImage: function() {
    if (!this.tweet || !this.tweet.entities || !this.tweet.entities.media) return null;
    return this.tweet.entities.media[0].media_url;
  }
});
