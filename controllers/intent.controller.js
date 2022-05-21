'use strict'

const dialogflow = require('@google-cloud/dialogflow');
const projectId = 'tfg-hector-nmsv';
const keyFilename = './config/tfg-hector-nmsv.json';
const parent = 'projects/' + projectId + '/locations/global';
const intentsClient = new dialogflow.IntentsClient({projectId, keyFilename});
const intentCtrl = {};


intentCtrl.pruebas = (req, res) => {
    console.log('Esta prueba ha salido bien');
    res.status(200).send({ message: 'fliiiias' });
}

intentCtrl.createIntent = async (req, res) => {
    const agentPath = intentsClient.projectAgentPath(projectId);
    const displayName = 'PRUEBA-CREACION-INTENT12';
    const messageTexts = ['Rainy', 'Sunny'];
    const trainingPhrasesParts = [
        'Hello, What is weather today?',
        'How is the weather today?',
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
  
      const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: [message],
      };
  
      const createIntentRequest = {
        parent: agentPath,
        intent: intent,
      };

      // Create the intent
    const [response] = await intentsClient.createIntent(createIntentRequest);
    console.log(`Intent ${response.name} created`);
}

module.exports = intentCtrl;