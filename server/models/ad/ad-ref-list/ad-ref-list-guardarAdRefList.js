'use strict';
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');


let guardarAdRefList = function (adRefListJson, app) {
    console.log("AdRefList - guardarAdRefList() - Data recibida adRefListJson{}", adRefListJson);

    return new Promise((resolve, reject) => {
        app.models.AdRefList.findOrCreate(

            {
                adRefListId: funt.id(),
                adClientId: adRefListJson.adClientId,
                adOrgId: adRefListJson.adOrgId,
                isactive: 'Y',
                created: funt.dateTimeNow(),
                createdby: adRefListJson.createdby,
                updated: funt.dateTimeNow(),
                updatedby: adRefListJson.updatedby,
                name: adRefListJson.name,
                description: adRefListJson.description,
                value: adRefListJson.value,
                adReferenceId: adRefListJson.adReferenceId
            },
            function (err, adRefListJsonResponse) {
                if (err) {
                    console.log("Error al Insertar AdRefList", err);
                    reject(err);
                } else {
                    console.log("AdRefList - guardarAdRefList  OK: adRefListJsonResponse{}", adRefListJsonResponse);

                    if (adRefListJsonResponse && adRefListJsonResponse != null && adRefListJsonResponse != '') {

                        let response = {
                            'resultado': Constantes.MSG_OK,
                            'mensaje': Constantes.MSG_INFO_GUARDAR,
                            'objetoResponse': adRefListJsonResponse
                        };
                        resolve(response);

                    } else {
                        console.log('AdRefList - guardarAdRefList OK: No se encuentran datos a ingresar.');
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
    guardarAdRefList
};