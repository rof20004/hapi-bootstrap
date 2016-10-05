'use strict';

var Mongoose = require('../database').Mongoose;

var usuarioSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: {unique: true},
    dropDups: true
  },
  endereco: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    enum: ['Admin', 'User'],
    required: true
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  needResetPassword: {
    type: Boolean,
    default: false
  }
});

module.exports = Mongoose.model('Usuario', usuarioSchema, 'usuario');
