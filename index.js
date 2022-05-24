'use strict'

var app = require('./app');
var port = process.env.PORT || 3977;/*

app.listen(port, () => {
    console.log('Servidor funcionando en: http://localhost:' + port);
});*/

/*const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};
https
  .createServer(options, app)
  .listen({port}, () => {
      console.log('https://localhost:3977/pruebas');
  });
  */

  //var express = require("express");
var bodyParser = require("body-parser");
const ngrok = require('ngrok');
const { response } = require("express");

//var app = express();

var port = process.env.PORT || 3977;
var ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    if (req.body.queryResult.action == "pregunta1") {
        console.log(req.body.queryResult.parameters.respuesta1);
        let res1 = req.body.queryResult.parameters.respuesta1;
        let response = "Se ha registrado tu respuesta 1 " + res1 + " ¿Quieres seguir con el cuestionario?";
        console.log(response);
        res.json({
            "fulfillmentText": response
        });
    }

    if (req.body.queryResult.action == "pregunta2") {
      console.log(req.body.queryResult.parameters.respuesta2);
      let res2 = req.body.queryResult.parameters.respuesta2;
      let response = "Se ha registrado tu respuesta 2 " + res2 + " ¿Quieres seguir con el cuestionario?";
      console.log(response);
      res.json({
          "fulfillmentText": response
      });
  }

  if (req.body.queryResult.action == "pregunta3") {
    console.log(req.body.queryResult.parameters.respuesta3);
    let res3 = req.body.queryResult.parameters.respuesta3;
    let response = "Se ha registrado tu respuesta 3 " + res3 + " ¿Quieres seguir con el cuestionario?";
    console.log(response);
    res.json({
        "fulfillmentText": response
    });
}

if (req.body.queryResult.action == "pregunta4") {
  console.log(req.body.queryResult.parameters.respuesta4);
  let res4 = req.body.queryResult.parameters.respuesta4;
  let response = "Se ha registrado tu respuesta 4 " + res4 + " ¿Quieres seguir con el cuestionario?";
  console.log(response);
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta5") {
  console.log(req.body.queryResult.parameters.respuesta5);
  let res5 = req.body.queryResult.parameters.respuesta5;
  let response = "Se ha registrado tu respuesta 5 " + res5 + " ¿Quieres seguir con el cuestionario?";
  console.log(response);
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta6") {
  console.log(req.body.queryResult.parameters.respuesta6);
  let res6 = req.body.queryResult.parameters.respuesta6;
  let response = "Se ha registrado tu respuesta6 " + res6 + " ¿Quieres seguir con el cuestionario?";
  console.log(response);
  res.json({
      "fulfillmentText": response
  });
}
});

app.listen(port, ip);

(async function () {
    const url = await ngrok.connect(port);
    console.log(url);
})();


 