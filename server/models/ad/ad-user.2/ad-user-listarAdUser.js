'use strict';
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');

let listarAdUser = function (adUserJson, app, callback) {
    console.log('AdUser - listarAdUser data recibida adUserJson{}', adUserJson);
    let AdUser = app.models.AdUser

    return new Promise((resolve, reject) => {

        AdUser.find(
            {
                where:
                {
                    adClientId: adUserJson.adClientId,
                    adOrgId: { inq: [adUserJson.adOrgId, 0] }
                }
            },
            function (err, adUserJsonResponseList) {
                if (err) {
                    console.log("AdUser - listarAdUser ERROR: ", err);
                    reject(err);
                }
                else {
                    if (adUserJsonResponseList !== undefined && adUserJsonResponseList.length > 0) {

                        let response = {
                            'resultado': Constantes.MSG_OK,
                            'mensaje': Constantes.MSG_INFO_CONSULTA,
                            'resultadosList': {
                                'resultado': adUserJsonResponseList
                            }
                        };
                        resolve(response);

                    } else {
                        console.log('AdUser - listarAdUser OK: No se encuentran datos de la consulta.');
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
    listarAdUser
};