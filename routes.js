'use strict';

const Pages = require('./pages');
const Security = require('./controllers/security');

exports.endpoints = [
	{method: 'GET',    	path: '/login',											config: Pages.login},
	{method: 'POST',    path: '/login',											config: Security.login},
	{method: 'GET',     path: '/logout',										config: Security.logout},
	{method: 'GET',    	path: '/register',									config: Pages.register},
	{method: 'POST',    path: '/register',									config: Security.register},
	{method: 'GET',    	path: '/',											    config: Pages.index},
	{method: 'GET',    	path: '/contato/list',							config: Pages.listContatos},
	{method: 'GET',    	path: '/contato/add',							  config: Pages.addContato}
];
