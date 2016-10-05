'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Usuario = require('../models/usuario');
const Bcrypt = require('bcrypt');

exports.login = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    Usuario.find({email: request.payload.login}, (err, usuario) => {
      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      }

      if (usuario.length > 0) {
        if (Bcrypt.compareSync(request.payload.password, usuario[0].password)) {
          request.cookieAuth.set(usuario);
          return reply.redirect('/');
        } else {
          return reply(Boom.unauthorized('Usuário ou senha inválidos', err));
        }
      } else if (usuario.length === 0) {
        return reply(Boom.unauthorized('Usuário não encontrado', err));
      }
    });
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

exports.register = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (request.payload.password !== request.payload.password2) {
      return reply.view('register', {messageError: 'Senha não confere, as senhas precisam ser iguais',
                                     nome: request.payload.nome,
                                     email: request.payload.email,
                                     endereco: request.payload.endereco,
                                     telefone: request.payload.endereco
                                    }, {layout: false});
    }

    request.payload.password = Bcrypt.hashSync(request.payload.password, 10);
    request.payload.scope = 'User';

    const usuario = new Usuario(request.payload);
    usuario.save((err, usuario) => {
      if (err) {
        if (err.code === 11000) {
          return reply.view('register', {messageError: 'Já existe usuário cadastrado com o e-mail informado',
                                         nome: request.payload.nome,
                                         email: request.payload.email,
                                         endereco: request.payload.endereco,
                                         telefone: request.payload.telefone
                                        }, {layout: false});
        } else {
          return reply.view('register', {messageError: 'Ocorreu um erro ao cadastrar o usuário, tente novamente mais tarde',
                                         nome: request.payload.nome,
                                         email: request.payload.email,
                                         endereco: request.payload.endereco,
                                         telefone: request.payload.telefone
                                        }, {layout: false});
        }
      }
      return reply.view('register', {messageSuccess: 'Usuário cadastrado com sucesso!'}, {layout: false});
    });
  },
  validate: {
    payload: {
      email: Joi.string().email().required()
    }
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}
