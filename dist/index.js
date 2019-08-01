"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lutils = require("log-utils");
var onHeaders = require("on-headers");
var colors_1 = require("colors");
var tjam_node_exceptions_1 = require("tjam-node-exceptions");
var settings = {};
function setSettings(systemSettings) {
    settings = systemSettings;
}
exports.setSettings = setSettings;
function getNow() {
    var date = new Date();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return [date.getDate(), date.getMonth(), date.getFullYear(), h, m, s];
}
function plugin(req, res, next) {
    var now = getNow();
    var start = (new Date()).getTime();
    onHeaders(res, function () {
        var t = ((new Date()).getTime() - start);
        var tt = t.toFixed(3);
        var resStatus = res.statusCode == 401 ? (lutils.success).cyan.bold + ' ' + (res.statusCode.toString()).yellow : (res.statusCode >= 200 && res.statusCode <= 399 ? (lutils.success).cyan.bold + ' ' + (res.statusCode.toString()).green : (res.statusCode >= 400 && res.statusCode <= 499 ? (lutils.warning).red.bold + ' ' + (res.statusCode.toString()).yellow : (res.statusCode >= 100 && res.statusCode <= 199 ? (lutils.info).cyan.bold + ' ' + (res.statusCode.toString()).blue : (lutils.error).red.bold + ' ' + (res.statusCode.toString()).red)));
        var reqTime = t < 30 ? (tt).cyan : (t >= 30 && t <= 80 ? (tt).yellow : (tt).red);
        var id = settings.system ? settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green : 'tjam-node-log-utils'.grey;
        var method = req.method == 'DELETE' ? (req.method).red.bold : (req.method == 'POST' || req.method == 'PUT' ? (req.method).blue.bold : (req.method == 'OPTIONS' ? (req.method).reset.bold : (req.method).magenta.bold));
        console.log('' +
            '['.gray.bold +
            '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey +
            '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold +
            id + ' :: '.cyan +
            method + ' - '.grey +
            resStatus + ' - '.grey +
            reqTime + ' ms - '.grey +
            (req.originalUrl).gray + ' - '.grey +
            '['.cyan.bold + 'via '.grey.bold + (req.get('user-agent') ? req.get('user-agent') : 'agente desconhecido').grey + ']'.cyan.bold, now[0], now[1], now[2], now[3], now[4]);
    });
    next();
}
exports.plugin = plugin;
function debug(text, obj) {
    try {
        if (settings.system.debug) {
            var now = getNow();
            var msg = text;
            var query_1 = obj;
            var querystringified = '';
            if (typeof query_1 !== 'undefined' && !Array.isArray(query_1)) {
                if (typeof query_1 === 'object') {
                    for (var x in query_1) {
                        if (querystringified != '')
                            querystringified += ', \n'.yellow;
                        querystringified += '\t' + colors_1.cyan(x) + ': '.yellow + (function (key) {
                            if (typeof key === 'number' && !isNaN(key))
                                return colors_1.blue(query_1[x]);
                            if (typeof key === 'number' && isNaN(key))
                                return colors_1.red('NaN');
                            if (typeof key === 'string')
                                return '\''.yellow + colors_1.green(query_1[x]) + '\''.yellow;
                            if (typeof key === 'boolean')
                                return colors_1.magenta(query_1[x]);
                            if (typeof key === 'undefined')
                                return colors_1.gray.bold('undefined');
                            if (typeof key === 'object' && !key)
                                return colors_1.gray.bold('null');
                            else
                                return colors_1.yellow(query_1[x]);
                        })(query_1[x]);
                    }
                }
                else {
                    querystringified = colors_1.cyan.bold(query_1);
                }
            }
            console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.warning).red + ' - '.grey + '%s'.reset, now[0], now[1], now[2], now[3], now[4], msg);
            if (querystringified != '' && typeof querystringified !== 'undefined' && typeof query_1 !== 'undefined') {
                if (typeof query_1 == 'object') {
                    console.log('{\n%s\n}', querystringified);
                }
                else {
                    console.log('\n\t%s\n', querystringified);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        throw new tjam_node_exceptions_1.GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}
exports.debug = debug;
function log(msg) {
    var now = getNow();
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.reset, now[0], now[1], now[2], now[3], now[4], msg);
    }
    catch (e) {
        throw new tjam_node_exceptions_1.GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}
exports.log = log;
function error(text, obj) {
    try {
        var now = getNow();
        var msg = text;
        var query_2 = obj;
        var querystringified = '';
        if (typeof query_2 !== 'undefined' && !Array.isArray(query_2)) {
            if (typeof query_2 === 'object') {
                for (var x in query_2) {
                    if (querystringified != '')
                        querystringified += ', \n'.yellow;
                    querystringified += '\t' + colors_1.cyan(x) + ': '.yellow + (function (key) {
                        if (typeof key === 'number')
                            return colors_1.blue(query_2[x]);
                        if (typeof key === 'string')
                            return '\''.yellow + colors_1.green(query_2[x]) + '\''.yellow;
                        if (typeof key === 'boolean')
                            return colors_1.magenta(query_2[x]);
                        if (typeof key === 'undefined')
                            return colors_1.gray.bold(query_2[x]);
                        else
                            return colors_1.yellow(query_2[x]);
                    })(query_2[x]);
                }
            }
            else {
                querystringified = colors_1.cyan.bold(query_2);
            }
        }
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.error).red + ' - '.grey + '%s'.red, now[0], now[1], now[2], now[3], now[4], msg);
        if (querystringified != '' && typeof querystringified !== 'undefined' && typeof query_2 !== 'undefined') {
            if (typeof query_2 == 'object') {
                console.log('{\n%s\n}', querystringified);
            }
            else {
                console.log('\n\t%s\n', querystringified);
            }
        }
    }
    catch (e) {
        throw new tjam_node_exceptions_1.GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}
exports.error = error;
function info(msg) {
    var now = getNow();
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.info).blue + ' - '.grey + '%s'.blue, now[0], now[1], now[2], now[3], now[4], msg);
    }
    catch (e) {
        throw new tjam_node_exceptions_1.GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}
exports.info = info;
function success(msg) {
    var now = getNow();
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.success).green.bold + ' - '.grey + '%s'.cyan, now[0], now[1], now[2], now[3], now[4], msg);
    }
    catch (e) {
        throw new tjam_node_exceptions_1.GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}
exports.success = success;
//# sourceMappingURL=index.js.map