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

// Configurar cabeceras HTTP

// rutas base

app.get('/pruebas', (req, res) => {
    res.status(200).send({message: 'Bienvenido al canal.'});
});

app.post('/upload', (req, res) => {
    let EDFile = req.files.file;
    EDFile.mv(`./files/copia.txt`, err => {
        if (err) return res.status(500).send({ message: err });

        return res.status(200).send({ message: 'File upload' });
    });
});

app.use('/agent', agent_routes);
app.use('/intent', intent_routes);
app.use('/fichero', fichero_routes);

// const express = require("express");
// const bodyParser = require("body-parser");

// Para hacer peticiones http de forma simple
const request = require('request');

// Para usar express dentro de Node
// const app = express();

// Definimos el puerto
// const port = process.env.PORT || 8899;

// Traducción en tiempo real
const translate = require('google-translate-api');

// Middleware de análisis del cuerpo de Node.js 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;

