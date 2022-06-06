'use strict'

const express = require('express');
const IntentController = require('../controllers/intent.controller');
const api = express.Router();

api.get('/create-intent', IntentController.createIntent);
api.get('/prueba', IntentController.detectIntent);
api.get('/createIntentFin', IntentController.createIntentFin);
api.get('/createIntentPregunta', IntentController.createIntentPregunta);
// api.post('/createIntentPregunta', IntentController.createIntentPregunta);
api.post('/premierpadel', IntentController.crearIntentsPreguntas);
api.get('/lolo', IntentController.createIntentRespuesta);
api.post('/lele', IntentController.crearIntentsRespuestas);

module.exports = api;