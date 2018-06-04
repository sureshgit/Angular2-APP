'use strict';
const Path = require('path');
const Hapi = require('hapi');
const { downloadAsAttachment, streamFile } = require('./document/document.service');

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../dist')
            }
        }
    }
});

server.connection({ port: 8000 });

// Add the route
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/assets/{filename*}',
        handler: function (request, reply) {
            var filePath = Path.join('assets', request.params.filename);
            reply.file(filePath);
        }
    });

    server.route({
        method: 'GET',
        path: '/{filename}.{ext}',
        handler: function (request, reply) {
            reply.file(request.params.filename + '.' + request.params.ext);
        }
    });

    server.route({
        method: 'GET',
        path: '/{filename*}',
        handler: function (request, reply) {
            reply.file('index.html');
        }
    });
});

server.route({
    method: 'GET',
    path: '/filedownload',
    config: {
        state: {
            parse: true,
            failAction: 'error'
        }
    },
    handler: function (request, reply) {
        if (!request.state.token) {
            reply("No token available").code(500);
        }

        downloadAsAttachment(request, reply);
    }
});

server.route({
    method: 'GET',
    path: '/training/launch/{module}/{filePath*}',
    config: {
        state: {
            parse: true,
            failAction: 'error'
        }
    },
    handler: function (request, reply) {
        if (!request.state.token) {
            reply("No token available").code(500);
        }

        streamFile(request, reply);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});