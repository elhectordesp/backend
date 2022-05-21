'use strict'

const express = require('express');
const IntentController = require('../controllers/intent.controller');
const api = express.Router();

api.get('/create-intent', IntentController.createIntent);

module.exports = api;