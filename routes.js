'use strict';

const Pages = require('./pages');
const Security = require('./controllers/security');
const Produto = require('./controllers/produto');

exports.endpoints = [
	{method: 'GET',    	path: '/login',											config: Pages.login},
	{method: 'POST',    path: '/login',											config: Security.login},
	{method: 'GET',     path: '/logout',										config: Security.logout},
	{method: 'GET',    	path: '/register',									config: Pages.register},
	{method: 'POST',    path: '/register',									config: Security.register},
	{method: 'GET',    	path: '/',											    config: Pages.index},
	{method: 'GET',    	path: '/contato/list',							config: Pages.listContatos},
	{method: 'GET',    	path: '/contato/add',							  config: Pages.addContato},
	{method: 'GET',    	path: '/produto/list',							config: Pages.listProdutos},
	{method: 'GET',    	path: '/produto/add',							  config: Pages.addProduto},
	{method: 'POST',    path: '/produto/add',								config: Produto.add}
];
