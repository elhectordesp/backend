"use strict";

const dialogflow = require("@google-cloud/dialogflow");
const projectId = "tfg-hector-nmsv";
const keyFilename = "./config/tfg-hector-nmsv.json";
const parent = "projects/" + projectId + "/locations/global";
const intentsClient = new dialogflow.IntentsClient({ projectId, keyFilename });
const contextClient = new dialogflow.ContextsClient({ projectId, keyFilename });
const sessionClient = new dialogflow.SessionsClient({ projectId, keyFilename });
const intentCtrl = {};

intentCtrl.borrarIntent = async (req, res) => {
  const projectAgentPath = intentsClient.projectAgentPath(projectId);

  console.log(projectAgentPath);

  const request = {
    parent: projectAgentPath,
  };

  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  response.forEach(async (intent) => {
    if (
      intent.displayName !== "Default Welcome Intent" &&
      intent.displayName !== "Default Fallback Intent"
    ) {
      await intentsClient.deleteIntent({ name: intent.name });
    }
  });
  res.status(200).send({ message: "Borrados" });
};

intentCtrl.crearIntentsRespuestas = async (req, res) => {
  let enunciadosBody = req.body.enunciados;
  let respuestasBody = req.body.respuestas;
  const agentPath = intentsClient.projectAgentPath(projectId);

  enunciadosBody.forEach(async (enunciado) => {
    const displayName = "Respuesta" + enunciado[1];
    const trainingPhrasesParts = ["HOLA"];
    const respuestasAux = respuestasBody.filter(
      (resp) => resp[1] === enunciado[1]
    );
    let respuestas = ["HOLA"];
    for (let re of respuestasAux) {
      respuestas.push(re[0]);
    }

    const trainingPhrases = [];

    respuestas.forEach((respu) => {
      const part = {
        text: respu,
        entityType: "@sys.any",
        alias: "respuesta1",
      };

      const trainingPhrase = {
        type: "EXAMPLE",
        parts: [part],
      };

      trainingPhrases.push(trainingPhrase);
    });

    let inputContextNames = [];
    inputContextNames.push(
      "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
        "respuestaPregunta" +
        enunciado[1]
    );

    let outputContexts = [];
    let contextoSalida = {
      name:
        "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
        "siguientePregunta" +
        (enunciado[1] + 1),
      lifespanCount: 1,
      parameters: {},
    };
    let contextoSalidaFin = {
      name: "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarCuestionario",
      lifespanCount: 1,
      parameters: {},
    };

    outputContexts.push(contextoSalida);
    outputContexts.push(contextoSalidaFin);

    const parameters = [
      {
        name: "",
        displayName: "respuesta" + enunciado[1],
        mandatory: true,
        entityTypeDisplayName: "@sys.any",
        value: "$respuesta" + enunciado[1],
      },
    ];

    const intent = {
      displayName: displayName,
      parameters,
      trainingPhrases: trainingPhrases,
      inputContextNames: inputContextNames,
      outputContexts: outputContexts,
      webhookState: "WEBHOOK_STATE_ENABLED",
      action: "pregunta" + enunciado[1],
    };

    const createIntentRequest = {
      parent: agentPath,
      intent: intent,
    };
    const [response] = await intentsClient.createIntent(createIntentRequest);
    res.status(200).send({ message: `Intent ${response.name} created` });
  });

  /*
      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };

      const [response] = await intentsClient.createIntent(createIntentRequest);
      res.status(200).send({ message: `Intent ${response.name} created` });
      */
};

intentCtrl.crearIntentsPreguntas = async (req, res) => {
  let enunciadosBody = req.body.enunciados;
  let respuestasBody = req.body.respuestas;
  let respuestasCorrectasBody = req.body.respuestasCorrectas;

  const agentPath = intentsClient.projectAgentPath(projectId);

  enunciadosBody.forEach(async (enunciado) => {
    let primeraParte = "";
    let segundaParte = "";
    let esDeUnir = false;
    let col1 = [];
    let col2 = [];

    let auxilio = "";
    auxilio = enunciado[0].toString();

    if (auxilio.includes("/separacion/")) {
      primeraParte = auxilio.split("/separacion/")[0];
      segundaParte = auxilio.split("/separacion/")[1];
    }

    const displayName = "Pregunta" + enunciado[1];
    const respuestasAux = respuestasBody.filter(
      (resp) => resp[1] === enunciado[1]
    );
    const respuestasCAux = respuestasCorrectasBody.filter((corr) => [
      corr[1] === enunciado[1],
    ]);
    const respuestas = [];
    if (primeraParte === "") {
      respuestas.push(enunciado[0]);
    } else {
      respuestas.push(primeraParte + "_______________" + segundaParte);
    }

    for (let re of respuestasAux) {
      for (let i = 0; i < re[0].length; i++) {
        if (re[0][i] === "-" && re[0][i + 1] === ">") {
          let pro = "";
          pro = re[0].toString();
          col1.push(pro.split("->")[0]);
          col2.push(pro.split("->")[1]);
          esDeUnir = true;
        }
      }

      let a = [];
      let b = [];

      let paso = false;

      for (let i = 0; i < enunciadosBody.length; i++) {
        if (respuestasBody[i] !== undefined) {
          a = respuestasBody.filter((aa) => aa[1] === i);
        }

        if (respuestasCAux[i] !== undefined) {
          b = respuestasCAux.filter((bb) => bb[1] === i);
        }

        for (let p = 0; p < enunciadosBody.length; p++) {
          const a1 = Array.from(a);
          const a2 = Array.from(b);
          if (JSON.stringify(a1) === JSON.stringify(a2)) {
            if (a1[p]) {
              let yy = "";
              yy = a1[p].toString();
              if (!yy.includes("->")) {
                if (respuestas.length > 1) {
                  let s = yy.split(",")[0];
                  if (respuestas[1] === "-" + s) {
                    respuestas.pop();
                  }
                }
              }
            }
          }
        }
      }

      if (re[0] !== "VERDADEROoFALSO" && re[0] !== "NUMERICA" && !esDeUnir) {
        respuestas.push("-" + re[0]);
      } else if (re[0] === "VERDADEROoFALSO" && !esDeUnir) {
        respuestas.push("(Esta pregunta es de verdadero (T) o falso (F))");
      } else if (re[0] === "NUMERICA" && !esDeUnir) {
        respuestas.push(
          "(Esta respuesta es numérica, usa el . como separador decimal y redondea hacia arriba)"
        );
      }
    }

    if (esDeUnir) {
      while (col1.length > 0) {
        let rand1 = Math.floor(Math.random() * col1.length);
        let rand2 = Math.floor(Math.random() * col2.length);
        respuestas.push(col1[rand1] + "           " + col2[rand2]);
        col1.splice(rand1, rand1 + 1);
        col2.splice(rand2, rand2 + 1);
      }

      respuestas.push(
        "(Une las de la izquierda con la de la derecha con este formato: A->B; C->D; E->F;)"
      );
      esDeUnir = false;
    }

    const respuestasFinales = [{ text: { text: ["Hola"] } }];

    if (
      respuestas.length === 2 &&
      respuestas[1] !==
        "(Esta respuesta es numérica, usa el . como separador decimal y redondea hacia arriba)" &&
      respuestas[1] !== "(Esta pregunta es de verdadero (T) o falso (F))"
    ) {
      respuestas.pop();
    }

    if (
      respuestas.length !== 1 &&
      respuestas[respuestas.length - 1] !==
        "(Esta respuesta es numérica, usa el . como separador decimal y redondea hacia arriba)" &&
      respuestas[respuestas.length - 1] !==
        "(Esta pregunta es de verdadero (T) o falso (F))" &&
      respuestas[respuestas.length - 1] !==
        "(Une las de la izquierda con la de la derecha con este formato sin espacios entre respuesta y -> como en el ejemplo: A->B; C->D; E->F;)"
    ) {
      console.log(respuestas);
      if (
        respuestas[respuestas.length - 1] ===
        "(Une las de la izquierda con la de la derecha con este formato: A->B; C->D; E->F;)"
      ) {
      } else {
        respuestas.push(
          "(Si existe más de una respuesta separalas con -> , -> p.ej. ala, pico  )"
        );
      }
    }

    respuestas.forEach((respuesta) => {
      let res = [JSON.stringify(respuesta)];
      const messageText = {
        text: res,
      };

      const message = {
        text: messageText,
      };
      respuestasFinales.push(message);
    });

    const trainingPhrasesParts = [
      "Si",
      "Sii gracias",
      "Sii porfa",
      "yes",
      "yesssss",
    ];
    const trainingPhrases = [];

    trainingPhrasesParts.forEach((trainingPhrasesPart) => {
      const part = {
        text: trainingPhrasesPart,
      };

      const trainingPhrase = {
        type: "EXAMPLE",
        parts: [part],
      };

      trainingPhrases.push(trainingPhrase);
    });

    let inputContextNames = [];
    if (enunciado[1] === 1) {
      inputContextNames.push(
        "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
          "empezarCuestionario1"
      );
    } else {
      inputContextNames.push(
        "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
          "siguientePregunta" +
          enunciado[1]
      );
    }

    let outputContexts = [];
    let contextoSalida = {};
    let contextoSalidaFin = {};

    if (enunciado[1] === 1) {
      contextoSalida = {
        name:
          "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
          "respuestaPregunta" +
          enunciado[1],
        lifespanCount: 1,
        parameters: {},
      };
    } else {
      contextoSalida = {
        name:
          "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
          "respuestaPregunta" +
          enunciado[1],
        lifespanCount: 1,
        parameters: {},
      };
    }
    outputContexts.push(contextoSalida);

    respuestasFinales.shift();

    const intent = {
      displayName: displayName,
      trainingPhrases: trainingPhrases,
      messages: respuestasFinales,
      inputContextNames: inputContextNames,
      outputContexts: outputContexts,
    };

    const createIntentRequest = {
      parent: agentPath,
      intent: intent,
    };

    const [response] = await intentsClient.createIntent(createIntentRequest);
    //res.status(200).send({ message: `Intent ${response.name} created` });
  });

  // RESPUESTAS

  enunciadosBody.forEach(async (enunciado) => {
    const displayName = "Respuesta" + enunciado[1];
    const trainingPhrasesParts = ["HOLA"];
    const respuestasAux = respuestasBody.filter(
      (resp) => resp[1] === enunciado[1]
    );
    let respuestas = ["HOLA"];

    const trainingPhrases = [];

    respuestas.forEach((respu) => {
      const part = {
        text: respu,
        entityType: "@sys.any",
        alias: "respuesta" + enunciado[1],
      };

      const trainingPhrase = {
        type: "EXAMPLE",
        parts: [part],
      };

      trainingPhrases.push(trainingPhrase);
    });

    let inputContextNames = [];
    inputContextNames.push(
      "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
        "respuestaPregunta" +
        enunciado[1]
    );

    let outputContexts = [];
    let contextoSalida = {
      name:
        "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
        "siguientePregunta" +
        (enunciado[1] + 1),
      lifespanCount: 1,
      parameters: {},
    };
    let contextoSalidaFin = {
      name: "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarCuestionario",
      lifespanCount: 1,
      parameters: {},
    };

    outputContexts.push(contextoSalida);
    outputContexts.push(contextoSalidaFin);

    const parameters = [
      {
        name: "",
        displayName: "respuesta" + enunciado[1],
        mandatory: true,
        entityTypeDisplayName: "@sys.any",
        value: "$respuesta" + enunciado[1],
      },
    ];

    const intent = {
      displayName: displayName,
      parameters,
      trainingPhrases: trainingPhrases,
      inputContextNames: inputContextNames,
      outputContexts: outputContexts,
      webhookState: "WEBHOOK_STATE_ENABLED",
      action: "pregunta" + enunciado[1],
    };

    const createIntentRequest = {
      parent: agentPath,
      intent: intent,
    };
    const [response] = await intentsClient.createIntent(createIntentRequest);
    // res.status(200).send({ message: `Intent ${response.name} created` });
  });

  /*
  // finDeCuestionario
  const displayName = "FinDeCuestionario";
    const respuestas = ['Has acabado el cuestionario, se han guardado tus respuestas para su análisis. Un saludo.']
    const respuestasFinales = [{text: {text: ['Hola']} }];
    respuestas.forEach((respuesta) => {
      let res = [JSON.stringify(respuesta)];
      const messageText = {
        text: res,
      };
      
      const message = {
        text: messageText,
      };
      respuestasFinales.push(message);
    });

    const trainingPhrasesParts = [
        'Si',
        'Sii gracias',
        'Sii porfa',
        'yes',
        'yesssss',
    ];
    const trainingPhrases = [];
      
    trainingPhrasesParts.forEach(trainingPhrasesPart => {
        const part = {
            text: trainingPhrasesPart,
        };

        const trainingPhrase = {
            type: 'EXAMPLE',
            parts: [part],
          };

          trainingPhrases.push(trainingPhrase);
    });

    let inputContextNames = [];
      inputContextNames.push('projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/' + 'siguientePregunta'+enunciadosBody.length);

      let outputContexts = [];
      

      respuestasFinales.shift();
  
      const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: respuestasFinales,
        endInteraction: true,
        inputContextNames: inputContextNames,
        outputContexts: outputContexts
      };
  
      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };

      const [response] = await intentsClient.createIntent(createIntentRequest);

      */

  // finConversacion
  const displayName1 = "FinConversacion";
  const respuestas1 = ["Vale, esperemos volver a verte. Un saludo."];
  const respuestasFinales1 = [{ text: { text: ["Hola"] } }];
  respuestas1.forEach((respuesta) => {
    let res = [JSON.stringify(respuesta)];
    const messageText = {
      text: res,
    };

    const message = {
      text: messageText,
    };
    respuestasFinales1.push(message);
  });

  const trainingPhrasesParts1 = [
    "No",
    "No gracias",
    "Noo porfa",
    "noooo",
    "nono",
  ];
  const trainingPhrases1 = [];

  trainingPhrasesParts1.forEach((trainingPhrasesPart) => {
    const part = {
      text: trainingPhrasesPart,
    };

    const trainingPhrase = {
      type: "EXAMPLE",
      parts: [part],
    };

    trainingPhrases1.push(trainingPhrase);
  });

  let inputContextNames1 = [];
  inputContextNames1.push(
    "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
      "empezarCuestionario"
  );

  let outputContexts1 = [];

  respuestasFinales1.shift();

  const intent1 = {
    displayName: displayName1,
    trainingPhrases: trainingPhrases1,
    messages: respuestasFinales1,
    endInteraction: true,
    inputContextNames: inputContextNames1,
    outputContexts: outputContexts1,
  };

  const createIntentRequest1 = {
    parent: agentPath,
    intent: intent1,
  };

  const [response1] = await intentsClient.createIntent(createIntentRequest1);

  res.status(200).send({ message: "Creados correctamente" });
};

intentCtrl.createIntentPregunta = async (req, res) => {
  const agentPath = intentsClient.projectAgentPath(projectId);
  const displayName = req.body.displayName;
  const respuestas = req.body.respuestas;
  const respuestasFinales = [{ text: { text: ["Hola"] } }];
  respuestas.forEach((respuesta) => {
    let res = [JSON.stringify(respuesta)];
    const messageText = {
      text: res,
    };

    const message = {
      text: messageText,
    };
    respuestasFinales.push(message);
  });

  const trainingPhrasesParts = [
    "Si",
    "Sii gracias",
    "Sii porfa",
    "yes",
    "yesssss",
  ];
  const trainingPhrases = [];

  trainingPhrasesParts.forEach((trainingPhrasesPart) => {
    const part = {
      text: trainingPhrasesPart,
    };

    const trainingPhrase = {
      type: "EXAMPLE",
      parts: [part],
    };

    trainingPhrases.push(trainingPhrase);
  });

  let inputContextNames = [];
  inputContextNames.push(
    "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
      req.body.contextoEntrada
  );

  let outputContexts = [];
  let contextoSalida = {
    name:
      "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
      req.body.contextoSalida,
    lifespanCount: 1,
    parameters: {},
  };
  let contextoSalidaFin = {
    name: "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarCuestionario",
    lifespanCount: 1,
    parameters: {},
  };

  outputContexts.push(contextoSalida);
  outputContexts.push(contextoSalidaFin);

  respuestasFinales.shift();

  const intent = {
    displayName: displayName,
    trainingPhrases: trainingPhrases,
    messages: respuestasFinales,
    inputContextNames: inputContextNames,
    outputContexts: outputContexts,
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };

  const [response] = await intentsClient.createIntent(createIntentRequest);
  res.status(200).send({ message: `Intent ${response.name} created` });
};

intentCtrl.createIntentRespuesta = async (req, res) => {
  const agentPath = intentsClient.projectAgentPath(projectId);
  const displayName = "Respuesta1";

  const trainingPhrasesParts = ["MONGO"];
  const trainingPhrases = [];

  trainingPhrasesParts.forEach((trainingPhrasesPart) => {
    const part = {
      text: trainingPhrasesPart,
      entityType: "@sys.any",
      alias: "respuesta1",
    };

    const trainingPhrase = {
      type: "EXAMPLE",
      parts: [part],
    };

    trainingPhrases.push(trainingPhrase);
  });

  let inputContextNames = [];
  inputContextNames.push(
    "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
      "respuestaPregunta1"
  );

  let outputContexts = [];
  let contextoSalida = {
    name:
      "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" +
      "siguientePregunta2",
    lifespanCount: 1,
    parameters: {},
  };
  let contextoSalidaFin = {
    name: "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarCuestionario",
    lifespanCount: 1,
    parameters: {},
  };

  outputContexts.push(contextoSalida);
  outputContexts.push(contextoSalidaFin);

  const parameters = [
    {
      name: "",
      displayName: "respuesta1",
      mandatory: true,
      entityTypeDisplayName: "@sys.any",
      value: "$respuesta1",
    },
  ];

  const intent = {
    displayName: displayName,
    parameters,
    trainingPhrases: trainingPhrases,
    inputContextNames: inputContextNames,
    outputContexts: outputContexts,
    webhookState: "WEBHOOK_STATE_ENABLED",
    action: "pregunta1",
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };

  const [response] = await intentsClient.createIntent(createIntentRequest);
  res.status(200).send({ message: `Intent ${response.name} created` });
};

intentCtrl.createIntent = async (req, res) => {
  const agentPath = intentsClient.projectAgentPath(projectId);
  const displayName = req.body.displayName;
  const messageTexts = [
    "Vale, vuelve a hablarme si quieres hacer un cuestionario. :)",
  ];
  const trainingPhrasesParts = ["No", "no gracias"];
  const trainingPhrases = [];

  trainingPhrasesParts.forEach((trainingPhrasesPart) => {
    const part = {
      text: trainingPhrasesPart,
    };

    const trainingPhrase = {
      type: "EXAMPLE",
      parts: [part],
    };

    trainingPhrases.push(trainingPhrase);
  });

  const messageText = {
    text: messageTexts,
  };

  const message = {
    text: messageText,
  };

  let inputContextNames = [];
  inputContextNames.push(
    "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarcuetsionari"
  );

  let outputContexts = [];
  const pepe = {
    name: "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/pruebadelanyo",
    lifespanCount: 1,
    parameters: {},
  };
  outputContexts.push(pepe);

  const intent = {
    displayName: displayName,
    trainingPhrases: trainingPhrases,
    messages: [message, message],
    endInteraction: true,
    inputContextNames: inputContextNames,
    outputContexts: outputContexts,
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent,
  };

  // Create the intent
  const [response] = await intentsClient.createIntent(createIntentRequest);
  res.status(200).send({ message: `Intent ${response.name} created` });
  //res.status(200);
};

intentCtrl.createIntentFin = async (req, res) => {
  const agentPath = intentsClient.projectAgentPath(projectId);
  const displayName = "FinConversacion";
  const messageTexts = [
    "Vale, vuelve a hablarme si quieres hacer un cuestionario. :)",
  ];
  const trainingPhrasesParts = ["No", "no gracias"];
  const trainingPhrases = [];

  trainingPhrasesParts.forEach((trainingPhrasesPart) => {
    const part = {
      text: trainingPhrasesPart,
    };

    const trainingPhrase = {
      type: "EXAMPLE",
      parts: [part],
    };

    trainingPhrases.push(trainingPhrase);
  });

  const messageText = {
    text: messageTexts,
  };

  const message = {
    text: messageText,
  };

  let inputContextNames = [];
  inputContextNames.push(
    "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarCuestionario"
  );

  const intent = {
    displayName,
    trainingPhrases,
    messages: [message],
    endInteraction: true,
    inputContextNames,
  };

  const createIntentRequest = {
    parent: agentPath,
    intent,
  };

  // Create the intent
  const [response] = await intentsClient.createIntent(createIntentRequest);
  res.status(200).send({ message: `Intent ${response.name} created` });
};

intentCtrl.detectIntent = async () => {
  let sessionId = "prueba";
  let text = "JUGON";

  // Create a new session
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryParams: {
      //List of context to be sent and activated before the query is executed
      contexts: [
        {
          // The context to be sent and activated or overrated in the session
          name: `projects/${projectId}/agent/sessions/${sessionId}/contexts/CONTEXT_NAME`,
          // The lifespan of the context
          lifespanCount: 8,
        },
      ],
    },
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: text,
        // The language used by the client (en-US)
        languageCode: "es",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
};

intentCtrl.deleteIntent = async () => {};

module.exports = intentCtrl;
