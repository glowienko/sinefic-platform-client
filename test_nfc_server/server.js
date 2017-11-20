
var express = require('express'),
    server = express(),
    morgan = require('morgan'),
    server_config = require('./server-config'),
    bodyParser = require('body-parser'),
    winston = require('winston'),
    cors = require('cors');

winston.level = 'debug';

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(cors());
server.use(require('./tags-api'));

server.listen(server_config.port, () => {
    console.log(" HTTP server is listening on port: " + server_config.port);
});