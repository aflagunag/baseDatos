'use strict'
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');


let contarAdUser = function (adUserJson, app) {

    console.log('AdUser - contarAdUser data recibida adUserJson{}', adUserJson);

    return new Promise((resolve, reject) => {
        app.models.AdUser.count(
            {
                adClientId: adUserJson.adClientId,
                adOrgId: { inq: [adUserJson.adOrgId, 0] },
            },
            function (err, conteo) {
                if (err) {
                    console.log("AdUser - contarAdUser ERROR: ", err);
                    reject(err);
                } else {
                    let response = {
                        'resultado': Constantes.MSG_OK,
                        'mensaje': Constantes.MSG_INFO_CONSULTA,
                        'objetoResponse': conteo
                    };
                    resolve(response);
                }
            }
        );
    })

}

module.exports = {
    contarAdUser
};