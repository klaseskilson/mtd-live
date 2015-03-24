Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.map(function() {
  this.route('feed', {
    path: '/feed',
    action: function() {
      this.render('feed')
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      this.render('question')
    }
  });
});
