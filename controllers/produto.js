'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Produto = require('../models/produto');

exports.list = {
  handler: function(request, reply) {
    Produto.find({descricao: 'teste'}, (err, produtos) => {
      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      }
      reply(produtos);
    });
  }
}

exports.add = {
  handler: function(request, reply) {
    const produto = new Produto(request.payload);
    produto.save((err, produto) => {
      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      }
      reply.view('produto/add', {messageSuccess: 'Produto cadastrado com sucesso'});
    });
  },
  validate: {
    payload: {
      descricao: Joi.string().required(),
      quantidade: Joi.number().required(),
      preco: Joi.number().precision(2).required()
    }
  }
}

exports.update = {
  handler: function(request, reply) {
    Produto.findOne({
      '_id': request.params.produtoId
    }, function(err, produto) {
      if (!err) {
        produto.save(function(err, produto) {
          if (!err) {
            reply('Produto atualizado com sucesso');
          } else {
            reply(Boom.badData('Erro na gravação das informações'));
          }
        });
      } else {
        reply(Boom.badData('Erro na gravação das informações'));
      }
    });
  }
}
