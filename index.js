"use strict";

var app = require("./app");
var port = process.env.PORT || 3977;
var bodyParser = require("body-parser");
const ngrok = require("ngrok");
const { response } = require("express");
const axios = require("axios");
const config = require("./config");
const { CONTADOR_ACIERTOS, ENUNCIADOS, CUESTIONARIO_ID } = require("./config");

var port = process.env.PORT || 3977;
// var ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", function (req, res) {
  let aux = "";
  let respuestas = [];

  // Llamar a count de enunciados
  axios
    .get(
      "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
    )
    .then((res) => {
      aux = res.data.cuestionario[0]._id;

      axios
        .post("https://prueba-mongodb-tfg.herokuapp.com/api/enunciado/contar-enunciados", {
          cuestionario: res.data.cuestionario[0]._id,
        })
        .then((res) => {
          config.ENUNCIADOS = res.data.contador;
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });

  if (req.body.queryResult.action == "pregunta1") {
    config.CONTADOR_ACIERTOS = 0;
    let res1 = req.body.queryResult.parameters.respuesta1;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta1.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 1,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 1) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta2") {
    let res1 = req.body.queryResult.parameters.respuesta2;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta2.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 2,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 2) {
              console.log('entro');
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta3") {
    let res1 = req.body.queryResult.parameters.respuesta3;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta3.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 3,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 3) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta4") {
    let res1 = req.body.queryResult.parameters.respuesta4;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta4.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 4,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 4) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta5") {
    let res1 = req.body.queryResult.parameters.respuesta5;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta5.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 5,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 5) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta6") {
    let res1 = req.body.queryResult.parameters.respuesta6;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta6.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 6,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 6) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta7") {
    let res1 = req.body.queryResult.parameters.respuesta7;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta7.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 7,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 7) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta8") {
    let res1 = req.body.queryResult.parameters.respuesta8;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta8.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 8,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 8) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta9") {
    let res1 = req.body.queryResult.parameters.respuesta9;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta9.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 9,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 9) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta10") {
    let res1 = req.body.queryResult.parameters.respuesta10;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta10.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 10,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 10) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta11") {
    let res1 = req.body.queryResult.parameters.respuesta11;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta11.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 11,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 11) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta12") {
    let res1 = req.body.queryResult.parameters.respuesta12;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta12.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 12,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 12) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta13") {
    let res1 = req.body.queryResult.parameters.respuesta13;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta13.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 13,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 13) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta14") {
    let res1 = req.body.queryResult.parameters.respuesta14;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta14.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 14,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 14) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta15") {
    let res1 = req.body.queryResult.parameters.respuesta15;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta15.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 15,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 15) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta16") {
    let res1 = req.body.queryResult.parameters.respuesta16;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta16.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 16,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 16) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta17") {
    let res1 = req.body.queryResult.parameters.respuesta17;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta17.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 17,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 17) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta18") {
    let res1 = req.body.queryResult.parameters.respuesta18;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta18.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 18,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 18) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (req.body.queryResult.action == "pregunta19") {
    let res1 = req.body.queryResult.parameters.respuesta19;
    let res2 = "";
    res2 = req.body.queryResult.parameters.respuesta19.toString();

    let response = "";

    axios
      .get(
        "https://prueba-mongodb-tfg.herokuapp.com/api/cuestionario/obtener-cuestionario/Cuestionario1"
      )
      .then((resA) => {
        aux = resA.data.cuestionario[0]._id;

        axios
          .post(
            "https://prueba-mongodb-tfg.herokuapp.com/api/respuestaCorrecta/corregir-pregunta",
            {
              cuestionario: resA.data.cuestionario[0]._id,
              numPregunta: 19,
              respuestas: res1,
            }
          )
          .then((res8) => {
            if (res8.data) {
              config.CONTADOR_ACIERTOS = config.CONTADOR_ACIERTOS + 1;
            }
            if (config.ENUNCIADOS === 19) {
              axios
                .post("https://prueba-mongodb-tfg.herokuapp.com/api/evaluacion/crear-evaluacion", {
                  nota: config.CONTADOR_ACIERTOS + "/" + config.ENUNCIADOS,
                  cuestionario: resA.data.cuestionario[0]._id,
                  fecha: new Date(),
                })
                .then((res) => {})
                .catch((error) => {
                  console.error(error);
                });
              response =
                "Has acabado el cuestionario, tu puntuación es: " +
                config.CONTADOR_ACIERTOS +
                " de " +
                config.ENUNCIADOS;
            } else {
              response =
                "Se ha registrado tu respuesta <<" +
                res1 +
                ">> ¿Quieres seguir con el cuestionario?";
            }

            res.json({
              fulfillmentText: response,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

app.listen(port, () => {
  console.log('Servidor en el puerto', port);
});

/*(async function () {
  const url = await ngrok.connect(port);
  console.log(url);
})();*/
