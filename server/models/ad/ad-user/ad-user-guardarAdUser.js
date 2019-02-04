'use strict';
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');


let guardarAdUser = function (adUserJson, app) {
    console.log("AdUser - guardarAdUser() - Data recibida adUserJson{}", adUserJson);

    return new Promise((resolve, reject) => {
        app.models.AdUser.findOrCreate(

            {
                adUserId: funt.id(),
                adClientId: adUserJson.adClientId,
                adOrgId: adUserJson.adOrgId,
                isactive: 'Y',
                created: funt.dateTimeNow(),
                createdby: 0,
                updated: funt.dateTimeNow(),
                updatedby: 0,
                username: adUserJson.username,
                contrasena: adUserJson.contrasena,
                primerNombre: adUserJson.primerNombre,
                primerApellido: adUserJson.primerApellido,
                email: adUserJson.email,
                adRoleId: adUserJson.adRoleId,
                estado: adUserJson.estado
            },
            function (err, adUserJsonResponse) {
                if (err) {
                    console.log("Error al Insertar AdUser", err);
                    reject(err);
                } else {
                    console.log("AdUser - guardarAdUser  OK: adUserJsonResponse{}", adUserJsonResponse);

                    if (adUserJsonResponse && adUserJsonResponse != null && adUserJsonResponse != '') {

                        let response = {
                            'resultado': Constantes.MSG_OK,
                            'mensaje': Constantes.MSG_INFO_GUARDAR,
                            'objetoResponse': adUserJsonResponse
                        };
                        resolve(response);

                    } else {
                        console.log('AdUser - guardarAdUser OK: No se encuentran datos a ingresar.');
                        let response = {
                            'status': 404,
                            'mensajeError': Constantes.MSG_ERROR_NO_INSERT
                        };
                        resolve(response);
                    }
                }
            }
        );
    });
}

module.exports = {
    guardarAdUser
};