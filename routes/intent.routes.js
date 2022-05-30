'use strict'

const express = require('express');
const IntentController = require('../controllers/intent.controller');
const api = express.Router();

api.get('/create-intent', IntentController.createIntent);
api.get('/prueba', IntentController.detectIntent);
api.get('/createIntentFin', IntentController.createIntentFin);
api.get('/createIntentPregunta', IntentController.createIntentPregunta);
api.post('/createIntentPregunta', IntentController.createIntentPregunta);

module.exports = api;