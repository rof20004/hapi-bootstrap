'use strict';

const Boom = require('boom');

exports.login = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    const user = request.payload;
    if (user.login.trim() != '' && user.senha.trim() != '' &&
        user.login === 'rof20004' && user.senha === 'boanerge') {
      request.cookieAuth.set(user);
      return reply.redirect('/');
    }
    reply(Boom.unauthorized('Usuário ou senha inválidos'));
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}

exports.logout = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/login');
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}
