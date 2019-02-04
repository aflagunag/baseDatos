'use strict';
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');

let listarAdRefList = function (adRefListJson, app, callback) {
    console.log('AdRefList - listarAdRefList data recibida adRefListJson{}', adRefListJson);
    let AdRefList = app.models.AdRefList

    return new Promise((resolve, reject) => {

        AdRefList.find(
            {
                where:
                {
                    adClientId: adRefListJson.adClientId,
                    adOrgId: { inq: [adRefListJson.adOrgId, 0] }
                }
            },
            function (err, adRefListJsonResponseList) {
                if (err) {
                    console.log("AdRefList - listarAdRefList ERROR: ", err);
                    reject(err);
                }
                else {
                    if (adRefListJsonResponseList !== undefined && adRefListJsonResponseList.length > 0) {

                        let response = {
                            'resultado': Constantes.MSG_OK,
                            'mensaje': Constantes.MSG_INFO_CONSULTA,
                            'resultadosList': {
                                'resultado': adRefListJsonResponseList
                            }
                        };
                        resolve(response);

                    } else {
                        console.log('AdRefList - listarAdRefList OK: No se encuentran datos de la consulta.');
                        let response = {
                            'status': 404,
                            'mensajeError': Constantes.MSG_ERROR_NO_INFO_LISTADO
                        };
                        resolve(response);
                    }
                }
            }
        );
    });
};

module.exports = {
    listarAdRefList
};