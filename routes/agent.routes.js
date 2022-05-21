'use strict'

const express = require('express');
const agentCtrl = require('../controllers/agent.controller');
const AgentController = require('../controllers/agent.controller');
const api = express.Router();

api.get('/probando', AgentController.pruebas);
api.get('/create-agent', AgentController.createAgent);
//api.delete('/delete-agent', AgentController.deleteAgent);

module.exports = api;