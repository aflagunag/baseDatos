'use strict';
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');

let actualizarAdRefList = function (adRefListJson, app, callback) {
    console.log("AdRefList - Data recibida actualizarAdRefList adRefListJson{}", adRefListJson);
    return new Promise((resolve, reject) => {

        app.models.AdRefList.upsertWithWhere(
            {
                adClientId: adRefListJson.adClientId,
                adOrgId: adRefListJson.adOrgId,
                adRefListId: adRefListJson.adRefListId
            },
            {
                updated: funt.dateTimeNow(),
                updatedby: adRefListJson.userId,
                codigo: adRefListJson.codigo,
                nombre: adRefListJson.nombre,
                estado: adRefListJson.estado,
                exigeCaso: adRefListJson.exigeCaso
                
            },
            function (err, adRefListJsonResult) {
                if (err) {
                    console.log("Error al Actualizar AdRefList", err);
                    reject(err);

                } else {

                    let response = {
                        'resultado': Constantes.MSG_OK,
                        'mensaje': Constantes.MSG_INFO_ACTUALIZAR,
                        'objetoResponse': adRefListJsonResult
                    };
                    resolve(response);

                }
            }
        );
    });
}

module.exports = {
    actualizarAdRefList
};