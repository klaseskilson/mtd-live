Meteor.startup(function () {
  // code to run on server at startup

  // load system conf
  var conf = JSON.parse(Assets.getText('conf.json'));

  // setup twit
  Twit = new TwitMaker({
    consumer_key: conf.twitter.consumer.key,
    consumer_secret: conf.twitter.consumer.secret,
    access_token: conf.twitter.access_token.key,
    access_token_secret: conf.twitter.access_token.secret
  });
});
