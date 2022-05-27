'use strict'

const dialogflow = require('@google-cloud/dialogflow');
const projectId = 'tfg-hector-nmsv';
const keyFilename = './config/tfg-hector-nmsv.json';
const parent = 'projects/' + projectId + '/locations/global';
const intentsClient = new dialogflow.IntentsClient({projectId, keyFilename});
const contextClient = new dialogflow.ContextsClient({projectId, keyFilename});
const sessionClient = new dialogflow.SessionsClient({projectId, keyFilename});
const intentCtrl = {};


intentCtrl.pruebas = (req, res) => {
    console.log('Esta prueba ha salido bien');
    res.status(200).send({ message: 'fliiiias' });
}

intentCtrl.createIntentPregunta = async (req, res) => {
  let i = 0;
  const agentPath = intentsClient.projectAgentPath(projectId);
    const displayName = req.body.displayName;
    const respuestas = req.body.respuestas;
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
      inputContextNames.push('projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/' + req.body.contextoEntrada);

      let outputContexts = [];
      let contextoSalida = {
        name: "projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/" + req.body.contextoSalida,
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

      console.log(respuestasFinales);
  
      const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: respuestasFinales,
        inputContextNames: inputContextNames,
        outputContexts: outputContexts
      };
  
      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };

      const [response] = await intentsClient.createIntent(createIntentRequest);
      console.log(`Intent ${response.name} created`);
      res.status(200).send({ message: `Intent ${response.name} created` });
}

intentCtrl.createIntent = async (req, res) => {
  console.log(req.body);
    const agentPath = intentsClient.projectAgentPath(projectId);
    const displayName = req.body.displayName;
    const messageTexts = ['Vale, vuelve a hablarme si quieres hacer un cuestionario. :)'];
    const trainingPhrasesParts = [
        'No',
        'no gracias',
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

    const messageText = {
        text: messageTexts,
      };
  
      const message = {
        text: messageText,
      };

      let inputContextNames = [];
      inputContextNames.push('projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarcuetsionari');

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
        outputContexts: outputContexts
      };
  
      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };

      // Create the intent
    const [response] = await intentsClient.createIntent(createIntentRequest);
    console.log(`Intent ${response.name} created`);
    res.status(200).send({ message: `Intent ${response.name} created` });
    //res.status(200);
}

intentCtrl.createIntentFin = async (req, res) => {
  const agentPath = intentsClient.projectAgentPath(projectId);
  const displayName = 'FinConversacion';
  const messageTexts = ['Vale, vuelve a hablarme si quieres hacer un cuestionario. :)'];
  const trainingPhrasesParts = [
      'No',
      'no gracias',
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

  const messageText = {
      text: messageTexts,
    };

    const message = {
      text: messageText,
    };

    let inputContextNames = [];
    inputContextNames.push('projects/tfg-hector-nmsv/agent/sessions/prueba/contexts/empezarCuestionario');   

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
  console.log(`Intent ${response.name} created`);
  res.status(200).send({ message: `Intent ${response.name} created` });
}

intentCtrl.detectIntent = async () => {
  let sessionId = "prueba";
  let text = "JUGON";

  // Create a new session
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryParams:{
        //List of context to be sent and activated before the query is executed
        contexts:[
            {
                // The context to be sent and activated or overrated in the session 
                name: `projects/${projectId}/agent/sessions/${sessionId}/contexts/CONTEXT_NAME`,
                // The lifespan of the context
                lifespanCount: 8
              }
        ]
    },
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: text,
        // The language used by the client (en-US)
        languageCode: 'es',
      },
    },
  };


  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  console.log(`  Output Contexts: ${JSON.stringify(result.outputContexts)}`)
}



module.exports = intentCtrl;