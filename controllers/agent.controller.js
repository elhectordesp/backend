'use strict'

const { AgentsClient } = require('@google-cloud/dialogflow');
const projectId = 'tfg-hector-nmsv';
const keyFilename = './config/tfg-hector-nmsv.json';
const parent = 'projects/' + projectId + '/locations/global';
const client = new AgentsClient({projectId, keyFilename});
const agentCtrl = {};

agentCtrl.pruebas = (req, res) => {
    res.status(200).send({ message: 'fliiiias' });
}

agentCtrl.createAgent = async (req, res) => {
    const agent = {
        parent: parent,
        displayName: 'TFG_HECTOR21',
        defaultLanguageCode: 'es-es',
        timeZone: 'Europe/Paris'
    };

    const request = {
        agent,
    };

    const [response] = await client.setAgent(request);
    res.status(200).send({message: `Response: ${JSON.stringify(response, null, 2)}`});
}

module.exports = agentCtrl;