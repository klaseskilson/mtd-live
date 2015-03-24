// var conf = JSON.parse(Assets.getText('conf.json'));

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.map(function mtdRouteMap() {
  this.route('feed', {
    path: '/feed',
    action: function() {
      this.render('feed');
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      this.render('question');
    }
  });

  this.route('admin', {
    path: '/admin/:secret',
    onBeforeAction: function(pause) {
      if (this.params.secret !== Meteor.call('admin_route')) {
        this.render('question');
      }
    },
    action: function() {
      this.render('admin');
    }
  });
});
