'use strict';

const Hapi = require('hapi');
const Config = require('./config');
const Routes = require('./routes');

const server = new Hapi.Server();
server.connection({
  host: Config.server.host,
  port: Config.server.port,
  routes: {
    cors: true
  }
});

server.register([
  require('inert'),
  require('vision'),
  require('hapi-auth-cookie')
], (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('session', 'cookie', true, {
    password: 'SessionAuth_Pé_Sword_Hapi_Server_Stats', //Use something more secure in production
    redirectTo: '/login', //If there is no session, redirect here
    ttl: 1 * 60 * 60 * 1000, // Set session to 1 day
    isSecure: false //Should be set to true (which is the default) in production
  });

  server.route({
    method: "GET",
    path: "/bower_components/{path*}",
    config: {
      auth: false,
      handler: {
        directory: {
          path: "./bower_components",
          listing: false,
          index: false
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/public/{path*}",
    config: {
      auth: false,
      handler: {
        directory: {
          path: "./public",
          listing: false,
          index: false
        }
      }
    }
  });

  server.route(Routes.endpoints);

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout'
  });

  server.ext('onPreResponse', function (request, reply) {
    var message = '';
    var response = request.response;
    if (response.isBoom && request.path === '/login') {
      message = response.output.payload.message;
      return reply.view('login', {messageError: message}, {layout: false});
    } else if (response.isBoom) {
        message = response.output.payload.message;
        var view = request.path.replace('/', '');
        if (view.trim() === '') {
          view = 'index';
        }
        return reply.view(view, {messageError: message});
    }
    reply.continue();
  });

  // Start the server
  server.start((err) => {
    console.log('Server   started:', server.info.uri);
  });
});
