'use strict'
const lineReader = require('line-reader');
const IntentController = require('./intent.controller');
const axios = require('axios');
const config = require('../config');

const ficheroCtrl = {};

ficheroCtrl.lecturaFichero = async (req, res) => {
    let idCuestionario = '';
    let i = 0;
    let splitAux;
    let enunciados = [];
    let respuestas = [];
    let respuestasCorrectas = [];
    let aux = false;
    let contadorRespuestasCorrectas = 0;
    let contadorEnunciados = 0;
    let comprobar = false;

    console.log('entroooo');

    await lineReader.eachLine('./files/copia.txt', (line, last) => {
        if (!line.includes('//')) {
            if (line.includes('::')) {
                // Si tiene :: se lo quitamos y nos quedamos con el titulo
                line = line.substring(2, line.length);
                line = line.substring(line.indexOf('::') +2, line.length);
                line = line.trim();
                if (line.includes('{') && line.includes('}')) {
                    contadorRespuestasCorrectas++;
                    contadorEnunciados++;
                    // Si tiene esto es que es una pregunta de V o F
                    let lineAux = line.split('{');
                    let contextoEntrada = 'siguientePregunta' + i;

                    if (i === 0) {
                        contextoEntrada= 'empezarCuestionario1';
                    }
                    
                    enunciados.push([lineAux[0], contadorEnunciados]);
                    respuestas.push(['VERDADEROoFALSO', contadorEnunciados]);
                    respuestasCorrectas.push([lineAux[1].replace('}', ''), contadorRespuestasCorrectas]);
                } else {
                    if (!line.includes('~') && !line.includes('#') && !line.includes('=') && !line.includes('{') && !line.includes('}')){
                        contadorEnunciados++;
                        enunciados.push([line.trim(), contadorEnunciados]);
                    }
                }
            } else {
                if (line.includes('{') && line.includes('}')) {
                    contadorEnunciados++;
                    contadorRespuestasCorrectas++;
                    // Si tiene esto es que es una pregunta de V o F
                    let lineAux = line.split('{');

                    enunciados.push([lineAux[0], contadorEnunciados]);
                    respuestas.push(['VERDADEROoFALSO', contadorEnunciados]);
                    respuestasCorrectas.push([lineAux[1].replace('}', ''), contadorRespuestasCorrectas]);
                } else {
                    line = line.trim();
                    if (!line.includes('~') && !line.includes('#') && !line.includes('=') && !line.includes('{') && !line.includes('}') && line.length > 0){
                        contadorEnunciados++;
                        enunciados.push([line.trim(), contadorEnunciados]);
                    }
                    if (line.includes('#')) {
                        // PREGUNTAS NUMEROS
                        contadorRespuestasCorrectas++;
                        respuestas.push(['NUMERICA', contadorEnunciados]);
                        respuestasCorrectas.push([line.trim().replace('#', ''), contadorRespuestasCorrectas]);
                    }else {
                        if (line.trim().startsWith('{')) {
                            comprobar = true;
                        }
                        if (line.trim().startsWith('}')) {
                            if (line.trim().length > 1) {
                                enunciados.push([line.trim().replace('}', ''), contadorEnunciados]);
                            }
                            comprobar = false;
                        }
                        if (line.includes('->')) {
                            // PREGUNTAS DE UNIR CON FLECHAS
                            if (comprobar) {
                                contadorRespuestasCorrectas++;
                                comprobar = false;
                            }
                            respuestas.push([line.trim().replace('=', ''), contadorRespuestasCorrectas]);
                            respuestasCorrectas.push([line.trim().replace('=', ''), contadorRespuestasCorrectas]);
                        } else {
                            if (line.startsWith('=') || line.startsWith('~')) {
                                respuestas.push([line.trim().replace('~', '').replace('=', ''), contadorEnunciados]);
                            }
                            if (line.includes('=')) {
                                if (comprobar) {
                                    contadorRespuestasCorrectas++;
                                    comprobar = false;
                                }
                                respuestasCorrectas.push([line.trim().replace('=', ''), contadorRespuestasCorrectas]);
                            }else {
                                if (line.trim().startsWith('~')) {
                                    line = line.replace('~', '');
                                    if (line.startsWith('%') && (line.includes('%', 2) || line.includes('%', 3) || line.includes('%', 4))) {
                                        if (comprobar) {
                                            contadorRespuestasCorrectas++;
                                            comprobar = false;
                                        }
                                        respuestasCorrectas.push([line.trim().split('%')[2], contadorRespuestasCorrectas]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        
            if (last) {


                for (let re of respuestas) {
                    let pro = '';
                    pro = re[0].toString();
                    if (pro.startsWith('%')) {
                        pro = pro.split('%')[2];
                        re[0] = pro;
                    }
                }

                for (let i = 0; i < enunciados.length; i++) {
                    if (i+1 != enunciados.length) {
                        if (enunciados[i][1] === enunciados[i+1][1]) {
                            // se repiten
                            enunciados[i][0] = enunciados[i][0] + '/separacion/' + enunciados[i+1][0];
                            enunciados.splice(i+1, 1);
                        }
                    }
                    
                } 

                config.ENUNCIADOS = enunciados.length;

                axios
                    .post('http://127.0.0.1:3977/intent/premierpadel', {
                        enunciados,
                        respuestas,
                        respuestasCorrectas,
                    })
                    .then(res => {                        
                        axios
                            .post('http://localhost:3999/api/cuestionario/crear-cuestionario', {
                                nombre: 'Cuestionario1',
                            })
                            .then(res => { 
                                idCuestionario = res.data.cuestionario._id;
                                for (const enun of enunciados) {
                                    axios.post('http://localhost:3999/api/enunciado/crear-enunciado', {
                                        numPregunta: enun[1],
                                        cuestionario: res.data.cuestionario._id,
                                        titulo: enun[0]
                                    })
                                    .then((res) => {
                                        config.CUESTIONARIO_ID = idCuestionario;
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    })
                                }

                                for (const respC of respuestasCorrectas) {
                                    axios.post('http://localhost:3999/api/respuestaCorrecta/crear-respuesta-correcta', {
                                        numPregunta: respC[1],
                                        cuestionario: res.data.cuestionario._id,
                                        texto: respC[0]
                                    })
                                    .then((res) => {
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    })
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        
                    });
            }
        }
    });  
    res.status(200).send({message: `hecho`});  
}

module.exports = ficheroCtrl;