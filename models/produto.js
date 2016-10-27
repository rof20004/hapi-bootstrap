'use strict';

var Mongoose = require('../database').Mongoose;

var produtoSchema = new Mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  preco: {
    type: Number,
    required: true
  }
});

module.exports = Mongoose.model('Produto', produtoSchema, 'produto');
