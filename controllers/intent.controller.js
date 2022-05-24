'use strict'

const dialogflow = require('@google-cloud/dialogflow');
const projectId = 'tfg-hector-nmsv';
const keyFilename = './config/tfg-hector-nmsv.json';
const parent = 'projects/' + projectId + '/locations/global';
const intentsClient = new dialogflow.IntentsClient({projectId, keyFilename});
const contextClient = new dialogflow.ContextsClient({projectId, keyFilename});
const intentCtrl = {};


intentCtrl.pruebas = (req, res) => {
    console.log('Esta prueba ha salido bien');
    res.status(200).send({ message: 'fliiiias' });
}

intentCtrl.createContext = async (req, res) => {
  
  let contexts = [{
    "name": "projects/" + projectId + "/agent/sessions/" + 'prueba' + "/contexts/empezarCuestionario",
    "lifespanCount": 1,
    
  }]

  const createContextRequest = {
    context: contexts
  };
  const [response] = await contextClient.createContext(contexts);
}

intentCtrl.createIntent = async (req, res) => {
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
      inputContextNames.push('empezarCuestionario');
      
  
      const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: [message],
        endInteraction: true,
        inputContextNames: inputContextNames,
      };
  
      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };

      // Create the intent
    const [response] = await intentsClient.createIntent(createIntentRequest);
    console.log(`Intent ${response.name} created`);
    res.status(200).send({ message: `Intent ${response.name} created` });
}

module.exports = intentCtrl;