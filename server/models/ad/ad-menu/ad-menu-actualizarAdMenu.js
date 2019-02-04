'use strict';
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');

let actualizarAdUser = function (adUserJson, app, callback) {
    console.log("AdUser - Data recibida actualizarAdUser adUserJson{}", adUserJson);
    return new Promise((resolve, reject) => {

        app.models.AdUser.upsertWithWhere(
            {
                adClientId: adUserJson.adClientId,
                adOrgId: adUserJson.adOrgId,
                adUserId: adUserJson.adUserId
            },
            {
                updated: funt.dateTimeNow(),
                updatedby: adUserJson.userId,
                codigo: adUserJson.codigo,
                nombre: adUserJson.nombre,
                estado: adUserJson.estado,
                exigeCaso: adUserJson.exigeCaso
                
            },
            function (err, adUserJsonResult) {
                if (err) {
                    console.log("Error al Actualizar AdUser", err);
                    reject(err);

                } else {

                    let response = {
                        'resultado': Constantes.MSG_OK,
                        'mensaje': Constantes.MSG_INFO_ACTUALIZAR,
                        'objetoResponse': adUserJsonResult
                    };
                    resolve(response);

                }
            }
        );
    });
}

module.exports = {
    actualizarAdUser
};