'use strict'

const { AgentsClient } = require('@google-cloud/dialogflow');
const projectId = 'tfg-hector-nmsv';
const keyFilename = './config/tfg-hector-nmsv.json';
const parent = 'projects/' + projectId + '/locations/global';
const client = new AgentsClient({projectId, keyFilename});
const agentCtrl = {};

agentCtrl.pruebas = (req, res) => {
    console.log('Esta prueba ha salido bien');
    res.status(200).send({ message: 'fliiiias' });
}

agentCtrl.createAgent = async (req, res) => {
    console.log('entro');
    const agent = {
        parent: parent,
        displayName: 'TFG_HECTOR19',
        defaultLanguageCode: 'en',
        supportedLanguageCodes: [
            'es'
          ],
        timeZone: 'Europe/Paris'
    };

    const request = {
        agent,
    };

    const [response] = await client.setAgent(request);
    res.status(200).send({message: `Response: ${JSON.stringify(response, null, 2)}`});
    console.log(`Response: ${JSON.stringify(response, null, 2)}`);
}

/*agentCtrl.deleteAgent = async (req, res) => {
    console.log(await client.deleteAgent());
}*/

module.exports = agentCtrl;