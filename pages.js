'use strict';

exports.login = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (request.auth.isAuthenticated) {
      return reply.redirect('/');
    }
    reply.view('login', null, {layout: false});
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};

exports.index = {
  handler: function(request, reply) {
    reply.view('index');
  }
};
