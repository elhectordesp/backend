'use strict'

const express = require('express');
const ficheroCtrl = require('../controllers/fichero.controller');
const api = express.Router();

api.get('/probando', ficheroCtrl.lecturaFichero);

module.exports = api;