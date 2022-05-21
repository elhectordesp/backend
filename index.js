'use strict'

var app = require('./app');
var port = process.env.PORT || 3977;/*

app.listen(port, () => {
    console.log('Servidor funcionando en: http://localhost:' + port);
});*/

const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};
https
  .createServer(options, app)
  .listen({port}, () => {
      console.log('https://localhost:3977/pruebas');
  });


 