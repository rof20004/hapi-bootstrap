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

exports.register = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (request.auth.isAuthenticated) {
      return reply.redirect('/');
    }
    reply.view('register', null, {layout: false});
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

exports.listContatos = {
  handler: function(request, reply) {
    reply.view('contato/list');
  }
};

exports.addContato = {
  handler: function(request, reply) {
    reply.view('contato/add');
  }
};

exports.listProdutos = {
  handler: function(request, reply) {
    reply.view('produto/list');
  }
};

exports.addProduto = {
  handler: function(request, reply) {
    reply.view('produto/add');
  }
};
