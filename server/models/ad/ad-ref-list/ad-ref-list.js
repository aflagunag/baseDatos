'use strict';

// Metodos Guardar
var beforeGuardar = require('./ad-ref-list-guardarAdRefList-before.js');
var guardarMetodo = require('./ad-ref-list-guardarAdRefList.js');

// Metodos Listar
var beforeListar = require('./ad-ref-list-listarAdRefList-before.js');
var listarMetodo = require('./ad-ref-list-listarAdRefList.js');

// Metodos actualizar
var beforeActualizar = require('./ad-ref-list-actualizarAdRefList-before.js');
var actualizarMetodo = require('./ad-ref-list-actualizarAdRefList.js');

// Metodos contar
var beforeContar = require('./ad-ref-list-contarAdRefList-before.js');
var contarMetodo = require('./ad-ref-list-contarAdRefList.js');

module.exports = function (AdRefList) {

    AdRefList.beforeRemote('guardarAdRefList', function (ctx, unused, next) {
        beforeGuardar.beforeGuardarAdRefList(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });

    AdRefList.beforeRemote('listarAdRefList', function (ctx, unused, next) {
        beforeListar.beforeListarAdRefList(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });

    AdRefList.beforeRemote('actualizarAdRefList', function (ctx, unused, next) {
        beforeActualizar.beforeActualizarAdRefList(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });

    AdRefList.beforeRemote('contarAdRefList', function (ctx, unused, next) {
        beforeContar.beforeContarAdRefList(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });
    /* Guardar un registro de la tabla AdRefList */
    AdRefList.guardarAdRefList = function (adRefListJson, callback) {
        return new Promise((resolve, reject) => {
            guardarMetodo.guardarAdRefList(adRefListJson, AdRefList.app)
                .then(res => {
                    if (typeof callback != "function") { resolve(res); }
                    else { callback(null, res); }
                })
                .catch(err => {
                    if (typeof callback != "function") { reject(err); }
                    else { callback(err); }
                });
        });
    };

    /* listar un registro de la tabla AdRefList */
    AdRefList.listarAdRefList = function (adRefListJson, callback) {
        return new Promise((resolve, reject) => {
            listarMetodo.listarAdRefList(adRefListJson, AdRefList.app)
                .then(res => {
                    if (typeof callback != "function") { resolve(res); }
                    else { callback(null, res); }
                })
                .catch(err => {
                    if (typeof callback != "function") { reject(err); }
                    else { callback(err); }
                });
        });
    };

     /* Actualizar un registro de la tabla AdRefList */
     AdRefList.actualizarAdRefList = function (adRefListJson, callback) {
        return new Promise((resolve, reject) => {
            actualizarMetodo.actualizarAdRefList(adRefListJson, AdRefList.app)
                .then(res => {
                    if (typeof callback != "function") { resolve(res); }
                    else { callback(null, res); }
                })
                .catch(err => {
                    if (typeof callback != "function") { reject(err); }
                    else { callback(err); }
                });
        });
    };

    /* Contar un registro de la tabla AdRefList */
    AdRefList.contarAdRefList = function (adRefListJson, callback) {
        return new Promise((resolve, reject) => {
            contarMetodo.contarAdRefList(adRefListJson, AdRefList.app)
                .then(res => {
                    if (typeof callback != "function") { resolve(res); }
                    else { callback(null, res); }
                })
                .catch(err => {
                    if (typeof callback != "function") { reject(err); }
                    else { callback(err); }
                });
        });
    };
    
    AdRefList.remoteMethod('guardarAdRefList', {
        accepts: {
            arg: 'adRefListJson',
            type: 'object',
            'http': {
                source: 'body'
            }
        },
        returns: {
            arg: 'response',
            type: 'object',
            root: true,
        },
        description: "Guardar un registro en la tabla AdRefList",
        http: {
            path: '/guardarAdRefList',
            verb: 'post'
        }
    });

    AdRefList.remoteMethod('listarAdRefList', {
        accepts: {
            arg: 'adRefListJson',
            type: 'object',
            'http': {
                source: 'body'
            }
        },
        returns: {
            arg: 'response',
            type: 'object',
            root: true,
        },
        description: "Listar registros de la tabla AdRefList",
        http: {
            path: '/listarAdRefList',
            verb: 'post'
        }
    });

    AdRefList.remoteMethod('actualizarAdRefList', {
        accepts: {
            arg: 'adRefListJson',
            type: 'object',
            'http': {
                source: 'body'
            }
        },
        returns: {
            arg: 'response',
            type: 'object',
            root: true,
        },
        description: "Actualizar registros de la tabla AdRefList",
        http: {
            path: '/actualizarAdRefList',
            verb: 'post'
        }
    });

    AdRefList.remoteMethod('contarAdRefList', {
        accepts: {
            arg: 'adRefListJson',
            type: 'object',
            'http': {
                source: 'body'
            }
        },
        returns: {
            arg: 'response',
            type: 'object',
            root: true,
        },
        description: "Contar registros de la tabla AdRefList",
        http: {
            path: '/contarAdRefList',
            verb: 'post'
        }
    });
};