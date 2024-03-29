'use strict'

var express = require('express');
var  bodyParser = require('body-parser');
const agent_routes = require('./routes/agent.routes');
const intent_routes = require('./routes/intent.routes');
const fichero_routes = require('./routes/fichero.routes');
const fileUpload = require('express-fileupload');

var app = express();

// Cargar rutas

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Configurar cabeceras HTTP

// rutas base

app.get('/pruebas', (req, res) => {
    res.status(200).send({message: 'Bienvenido al canal.'});
});

app.post('/upload', (req, res) => {
    console.log('entro aqui');
    let EDFile = req.files.file;
    EDFile.mv(`./files/copia.txt`, err => {
        if (err) return res.status(500).send({ message: err });

        return res.status(200).send({ message: 'File upload' });
    });
});

app.use('/agent', agent_routes);
app.use('/intent', intent_routes);
app.use('/fichero', fichero_routes);

// Middleware de análisis del cuerpo de Node.js 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;

