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
    path: '/admin/UamQC4L8U17qdGaMnJEgBA3DcZTGOgz4lawfbQeT',
    action: function() {
      this.render('admin');
    }
  });
});
