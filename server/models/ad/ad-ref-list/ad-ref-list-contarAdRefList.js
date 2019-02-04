'use strict'
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');


let contarAdRefList = function (AdRefListJson, app) {

    console.log('AdRefList - contarAdRefList data recibida AdRefListJson{}', AdRefListJson);

    return new Promise((resolve, reject) => {
        app.models.AdRefList.count(
            {
                adClientId: AdRefListJson.adClientId,
                adOrgId: { inq: [AdRefListJson.adOrgId, 0] },
            },
            function (err, conteo) {
                if (err) {
                    console.log("AdRefList - contarAdRefList ERROR: ", err);
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
    contarAdRefList
};