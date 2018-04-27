"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lutils = require("log-utils");
var colors_1 = require("colors");
var tjam_node_exceptions_1 = require("tjam-node-exceptions");
var settings = {};
function setSettings(systemSettings) {
    settings = systemSettings;
}
exports.setSettings = setSettings;
function debug(text, obj) {
    try {
        if (settings.system.debug) {
            var date = new Date();
            var today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
            var msg = text;
            var query_1 = obj;
            var querystringified = '';
            if (typeof query_1 !== 'undefined' && !Array.isArray(query_1)) {
                if (typeof query_1 === 'object') {
                    for (var x in query_1) {
                        if (querystringified != '')
                            querystringified += ', \n'.yellow;
                        querystringified += '\t' + colors_1.cyan(x) + ': '.yellow + (function (key) {
                            if (typeof key === 'number')
                                return colors_1.blue(query_1[x]);
                            if (typeof key === 'string')
                                return '\''.yellow + colors_1.green(query_1[x]) + '\''.yellow;
                            if (typeof key === 'boolean')
                                return colors_1.magenta(query_1[x]);
                            if (typeof key === 'undefined')
                                return colors_1.gray.bold(query_1[x]);
                            else
                                return colors_1.yellow(query_1[x]);
                        })(query_1[x]);
                    }
                }
                else {
                    querystringified = colors_1.cyan.bold(query_1);
                }
            }
            console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.warning).red + ' ' + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s', today[0], today[1], today[2], today[3], today[4], msg);
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
        throw new tjam_node_exceptions_1.GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}
exports.debug = debug;
function log(msg) {
    var date = new Date();
    var today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.reset, today[0], today[1], today[2], today[3], today[4], msg);
}
exports.log = log;
function error(text, obj) {
    if (settings.system.debug) {
        var date = new Date();
        var today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
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
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.error).red + ' ' + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.red, today[0], today[1], today[2], today[3], today[4], msg);
        if (querystringified != '' && typeof querystringified !== 'undefined' && typeof query_2 !== 'undefined') {
            if (typeof query_2 == 'object') {
                console.log('{\n%s\n}', querystringified);
            }
            else {
                console.log('\n\t%s\n', querystringified);
            }
        }
    }
}
exports.error = error;
function info(msg) {
    var date = new Date();
    var today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.info).blue + ' ' + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.blue, today[0], today[1], today[2], today[3], today[4], msg);
}
exports.info = info;
function success(msg) {
    var date = new Date();
    var today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.success).green.bold + ' ' + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.cyan, today[0], today[1], today[2], today[3], today[4], msg);
}
exports.success = success;
//# sourceMappingURL=index.js.map