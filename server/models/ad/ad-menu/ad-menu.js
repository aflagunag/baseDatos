'use strict';

// Metodos Guardar
var beforeGuardar = require('./ad-user-guardarAdUser-before.js');
var guardarMetodo = require('./ad-user-guardarAdUser.js');

// Metodos Listar
var beforeListar = require('./ad-user-listarAdUser-before.js');
var listarMetodo = require('./ad-user-listarAdUser.js');

// Metodos actualizar
var beforeActualizar = require('./ad-user-actualizarAdUser-before.js');
var actualizarMetodo = require('./ad-user-actualizarAdUser.js');

// Metodos contar
var beforeContar = require('./ad-user-contarAdUser-before.js');
var contarMetodo = require('./ad-user-contarAdUser.js');

module.exports = function (AdUser) {

    AdUser.beforeRemote('guardarAdUser', function (ctx, unused, next) {
        beforeGuardar.beforeGuardarAdUser(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });

    AdUser.beforeRemote('listarAdUser', function (ctx, unused, next) {
        beforeListar.beforeListarAdUser(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });

    AdUser.beforeRemote('actualizarAdUser', function (ctx, unused, next) {
        beforeActualizar.beforeActualizarAdUser(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });

    AdUser.beforeRemote('contarAdUser', function (ctx, unused, next) {
        beforeContar.beforeContarAdUser(ctx)
            .then(result => next())
            .catch(err => ctx.res.json(err));
    });
    /* Guardar un registro de la tabla AdUser */
    AdUser.guardarAdUser = function (adUserJson, callback) {
        return new Promise((resolve, reject) => {
            guardarMetodo.guardarAdUser(adUserJson, AdUser.app)
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

    /* listar un registro de la tabla AdUser */
    AdUser.listarAdUser = function (adUserJson, callback) {
        return new Promise((resolve, reject) => {
            listarMetodo.listarAdUser(adUserJson, AdUser.app)
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

     /* Actualizar un registro de la tabla AdUser */
     AdUser.actualizarAdUser = function (adUserJson, callback) {
        return new Promise((resolve, reject) => {
            actualizarMetodo.actualizarAdUser(adUserJson, AdUser.app)
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

    /* Contar un registro de la tabla AdUser */
    AdUser.contarAdUser = function (adUserJson, callback) {
        return new Promise((resolve, reject) => {
            contarMetodo.contarAdUser(adUserJson, AdUser.app)
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
    
    AdUser.remoteMethod('guardarAdUser', {
        accepts: {
            arg: 'adUserJson',
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
        description: "Guardar un registro en la tabla AdUser",
        http: {
            path: '/guardarAdUser',
            verb: 'post'
        }
    });

    AdUser.remoteMethod('listarAdUser', {
        accepts: {
            arg: 'adUserJson',
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
        description: "Listar registros de la tabla AdUser",
        http: {
            path: '/listarAdUser',
            verb: 'post'
        }
    });

    AdUser.remoteMethod('actualizarAdUser', {
        accepts: {
            arg: 'adUserJson',
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
        description: "Actualizar registros de la tabla AdUser",
        http: {
            path: '/actualizarAdUser',
            verb: 'post'
        }
    });

    AdUser.remoteMethod('contarAdUser', {
        accepts: {
            arg: 'adUserJson',
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
        description: "Contar registros de la tabla AdUser",
        http: {
            path: '/contarAdUser',
            verb: 'post'
        }
    });
};