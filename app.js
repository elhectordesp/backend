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
    console.log(req.files);
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

// Métodos de ruta (VERBOS HTTP: POST, GET, PUT, DELETE, etc...). Endpoint
app.post("/tiempo", (req, res) => {
    console.log(req);

    // JSON QUE ENVIA DIALOGFLOW
    let ubicacion = req.body.result.parameters["any"];

    // Valor de kelvin para hacer la transformación a centígrados
    let kelvin = 273.15;

    // URL del API para la consulta de la temperatura por la posición geográfica
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&APPID=apikey`;

    // Realizamos la petición
    request(url, function(error, response, body) {
        // Convertimos a JSON, la respuesta del servicio
        let _body = JSON.parse(body);

        // Que no de error el servicio externo
        if (_body.cod === '200') {

            // Pequeñas conversiones
            let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            let mesTxt = meses[parseInt(_body.list[0].dt_txt.split(" ")[0].split("-")[1]) - 1];
            let fecha = `${_body.list[0].dt_txt.split(" ")[0].split("-")[2]} de ${mesTxt} de ${_body.list[0].dt_txt.split(" ")[0].split("-")[0]}`;
            let temperatura = _body.list[0].main.temp - kelvin;

            // Formamos la respuesta que enviaremos a Dialogflow
            let _response = new Object();

            // DEFAULT RESPONSE EN DIALOGFLOW
            _response.speech = `La temperatura prevista para el día ${fecha} (${_body.list[0].dt_txt.split(" ")[1]}) en ${_body.city.name} es de ${temperatura.toFixed(1)} grados `;
            _response.displayText = _response.speech;
            _response.source = "webhook";

            // Enviamos la respuesta 
            res.status(_body.cod).send(_response);
        } else {
            // ERROR!!!
            translate(_body.message, { to: 'es' }).then((resTra) => {
                let _response = new Object();
                _response.speech = resTra.text;
                _response.displayText = resTra.text;
                _response.source = "webhook";
                res.status(200).send(_response);
            }).catch((err) => {
                console.error(err);
            });
        }
    });
});

module.exports = app;

