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
        let res1 = req.body.queryResult.parameters.respuesta1;
        let response = "Se ha registrado tu respuesta <<" + res1 + ">> ¿Quieres seguir con el cuestionario?";
              res.json({
            "fulfillmentText": response
        });
    }

    if (req.body.queryResult.action == "pregunta2") {
      let res2 = req.body.queryResult.parameters.respuesta2;
      let response = "Se ha registrado tu respuesta <<" + res2 + ">> ¿Quieres seguir con el cuestionario?";
          res.json({
          "fulfillmentText": response
      });
  }

  if (req.body.queryResult.action == "pregunta3") {
    let res3 = req.body.queryResult.parameters.respuesta3;
    let response = "Se ha registrado tu respuesta <<" + res3 + ">> ¿Quieres seguir con el cuestionario?";
      res.json({
        "fulfillmentText": response
    });
}

if (req.body.queryResult.action == "pregunta4") {
  let res4 = req.body.queryResult.parameters.respuesta4;
  let response = "Se ha registrado tu respuesta <<" + res4 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta5") {
  let res5 = req.body.queryResult.parameters.respuesta5;
  let response = "Se ha registrado tu respuesta <<" + res5 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta6") {
  let res6 = req.body.queryResult.parameters.respuesta6;
  let response = "Se ha registrado tu respuesta <<" + res6 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta7") {
  let res7 = req.body.queryResult.parameters.respuesta7;
  let response = "Se ha registrado tu respuesta <<" + res7 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta9") {
  let res9 = req.body.queryResult.parameters.respuesta9;
  let response = "Se ha registrado tu respuesta <<" + res9 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta10") {
  let res10 = req.body.queryResult.parameters.respuesta10;
  let response = "Se ha registrado tu respuesta <<" + res10 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta11") {
  let res11 = req.body.queryResult.parameters.respuesta11;
  let response = "Se ha registrado tu respuesta <<" + res11 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta12") {
  let res12 = req.body.queryResult.parameters.respuesta12;
  let response = "Se ha registrado tu respuesta <<" + res12 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta13") {
  let res13 = req.body.queryResult.parameters.respuesta13;
  let response = "Se ha registrado tu respuesta <<" + res13 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta14") {
  let res14 = req.body.queryResult.parameters.respuesta14;
  let response = "Se ha registrado tu respuesta <<" + res14 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta15") {
  let res15 = req.body.queryResult.parameters.respuesta15;
  let response = "Se ha registrado tu respuesta <<" + res15 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta16") {
  let res16 = req.body.queryResult.parameters.respuesta16;
  let response = "Se ha registrado tu respuesta <<" + res16 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta17") {
  let res17 = req.body.queryResult.parameters.respuesta17;
  let response = "Se ha registrado tu respuesta <<" + res17 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta18") {
  let res18 = req.body.queryResult.parameters.respuesta18;
  let response = "Se ha registrado tu respuesta <<" + res18 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta19") {
  let res19 = req.body.queryResult.parameters.respuesta19;
  let response = "Se ha registrado tu respuesta <<" + res19 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta20") {
  let res20 = req.body.queryResult.parameters.respuesta20;
  let response = "Se ha registrado tu respuesta <<" + res20 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta21") {
  let res21 = req.body.queryResult.parameters.respuesta21;
  let response = "Se ha registrado tu respuesta <<" + res21 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta22") {
  let res22 = req.body.queryResult.parameters.respuesta22;
  let response = "Se ha registrado tu respuesta <<" + res22 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta23") {
  let res23 = req.body.queryResult.parameters.respuesta23;
  let response = "Se ha registrado tu respuesta <<" + res23 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta24") {
  let res24 = req.body.queryResult.parameters.respuesta24;
  let response = "Se ha registrado tu respuesta <<" + res24 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta25") {
  let res25 = req.body.queryResult.parameters.respuesta25;
  let response = "Se ha registrado tu respuesta <<" + res25 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta26") {
  let res26 = req.body.queryResult.parameters.respuesta26;
  let response = "Se ha registrado tu respuesta <<" + res26 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta27") {
  let res27 = req.body.queryResult.parameters.respuesta27;
  let response = "Se ha registrado tu respuesta <<" + res27 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta28") {
  let res28 = req.body.queryResult.parameters.respuesta28;
  let response = "Se ha registrado tu respuesta <<" + res28 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta29") {
  let res29 = req.body.queryResult.parameters.respuesta29;
  let response = "Se ha registrado tu respuesta <<" + res29 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta30") {
  let res30 = req.body.queryResult.parameters.respuesta30;
  let response = "Se ha registrado tu respuesta <<" + res30 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta31") {
  let res31 = req.body.queryResult.parameters.respuesta31;
  let response = "Se ha registrado tu respuesta <<" + res31 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta32") {
  let res32 = req.body.queryResult.parameters.respuesta32;
  let response = "Se ha registrado tu respuesta <<" + res32 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta33") {
  let res33 = req.body.queryResult.parameters.respuesta33;
  let response = "Se ha registrado tu respuesta <<" + res33 + ">> ¿Quieres seguir con el cuestionario?";
  res.json({
      "fulfillmentText": response
  });
}

if (req.body.queryResult.action == "pregunta34") {
  let res34 = req.body.queryResult.parameters.respuesta34;
  let response = "Se ha registrado tu respuesta <<" + res34 + ">> ¿Quieres seguir con el cuestionario?";
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


 