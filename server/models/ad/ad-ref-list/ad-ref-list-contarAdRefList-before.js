'use strict';
var Constantes = require('../../../constantes/Constantes.json');
var funt = require('../../../funciones/funciones.js');

let beforeContarAdRefList = function (ctx) {

    return new Promise((resolve, reject) => {
        if (ctx.req.body == null || !ctx.req.body.adClientId || !ctx.req.body.adOrgId) {
            var response = {
                'status': 422,
                'mensaje': Constantes.MSG_ERROR_NO_DATA
            };
            reject(response);
        }
        else {
            resolve(ctx)
        }
    })
}

module.exports = {
    beforeContarAdRefList
};