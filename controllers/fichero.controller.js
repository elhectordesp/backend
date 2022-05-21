'use strict'
const lineReader = require('line-reader');

const ficheroCtrl = {};

ficheroCtrl.lecturaFichero = async (req, res) => {
    let splitAux;
    let enunciados = [];
    let respuestas = [];
    let respuestasCorrectas = [];
    let aux = false;
    let contadorRespuestasCorrectas = 0;
    let contadorEnunciados = 0;
    let comprobar = false;

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
                    enunciados.push([lineAux[0], contadorEnunciados]);
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
                    respuestasCorrectas.push([lineAux[1].replace('}', ''), contadorRespuestasCorrectas]);
                } else {
                    line = line.trim();
                    if (!line.includes('~') && !line.includes('#') && !line.includes('=') && !line.includes('{') && !line.includes('}') && line.length > 0){
                        contadorEnunciados++;
                        enunciados.push([line.trim(), contadorEnunciados]);
                    }
                    if (line.includes('#')) {
                        contadorRespuestasCorrectas++;
                        respuestasCorrectas.push([line.trim().replace('#', ''), contadorRespuestasCorrectas]);
                    }else {
                        if (line.trim().startsWith('{')) {
                            comprobar = true;
                        }
                        if (line.trim().startsWith('}')) {
                            comprobar = false;
                        }
                        if (line.includes('->')) {
                            if (comprobar) {
                                contadorRespuestasCorrectas++;
                                comprobar = false;
                            }
                            respuestasCorrectas.push([line.trim().replace('=', ''), contadorRespuestasCorrectas]);
                        } else {
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
                
                console.log(enunciados);
                /*console.log(respuestas);
                */console.log(respuestasCorrectas);
            }
        }
    });  
    res.status(200).send({message: `hecho`});  
}

module.exports = ficheroCtrl;