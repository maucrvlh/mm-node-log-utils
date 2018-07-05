import * as lutils from 'log-utils';
import * as onHeaders from 'on-headers';
import { yellow, cyan, blue, green, magenta, gray, red, italic } from 'colors';
import { GenericErrorException } from 'tjam-node-exceptions';

export interface SystemSettings {
    system?: {
        APIid?: string;
        v?: string|number;
        debug?: boolean;
    }
}

let settings: SystemSettings = {};

export function setSettings(systemSettings: SystemSettings) {
    settings = systemSettings;
}

function getNow() {
    let date = new Date();
    let h = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
    let m = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
    let s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    return [date.getDate(), date.getMonth(), date.getFullYear(), h, m, s];
}

export function plugin(req, res, next) {
    let now = getNow();
    let start = (new Date()).getTime();

    onHeaders(res, () => {
        let t = ((new Date()).getTime() - start);
        let tt = t.toFixed(3);

        let resStatus = res.statusCode == 401 ? (lutils.symbol.success).cyan.bold + ' ' + (res.statusCode.toString()).yellow : (res.statusCode >= 200 && res.statusCode <= 399 ? (lutils.symbol.success).cyan.bold + ' ' + (res.statusCode.toString()).green : ( res.statusCode >= 400 && res.statusCode <= 499 ? (lutils.symbol.warning).red.bold + ' ' + (res.statusCode.toString()).yellow : (res.statusCode >= 100 && res.statusCode <= 199 ? (lutils.symbol.info).cyan.bold + ' ' + (res.statusCode.toString()).blue : (lutils.symbol.error).red.bold + ' ' + (res.statusCode.toString()).red ) ) );

        let reqTime = t < 30 ? (tt).cyan : (t >= 30 && t <= 80 ? (tt).yellow : (tt).red);

        let id = settings.system ? settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green : 'tjam-node-log-utils'.grey;

        let method = req.method == 'DELETE' ? (req.method).red.bold : (req.method == 'POST' || req.method == 'PUT' ? (req.method).blue.bold : (req.method == 'OPTIONS' ? (req.method).reset.bold : (req.method).magenta.bold));

        console.log(''+
            '['.gray.bold + 
            '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + 
            '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + 
            id + ' :: '.cyan + 
            method + ' - '.grey + 
            resStatus + ' - '.grey + 
            reqTime + ' ms - '.grey + 
            (req.originalUrl).gray + ' - '.grey + 
            '['.cyan.bold + 'via '.grey.bold + (req.get('user-agent')).grey + ']'.cyan.bold,
            now[0], now[1], now[2], now[3], now[4]
        );
    });
    next();
}

export function debug(text: string, obj?: object) {
    try {
        if (settings.system.debug) {
            let now = getNow();

            let msg = text;
            let query = obj;
            let querystringified = '';
                
            if (typeof query !== 'undefined' && !Array.isArray(query)) {
                if (typeof query === 'object') {				
                    for (var x in query) {

                        if (querystringified != '') 
                            querystringified += ', \n'.yellow;

                        querystringified += '\t' + cyan(x) + ': '.yellow + ((key) => { 
                            if (typeof key === 'number') return blue(query[x]);
                            if (typeof key === 'string') return '\''.yellow + green(query[x]) + '\''.yellow;
                            if (typeof key === 'boolean') return magenta(query[x]);
                            if (typeof key === 'undefined') return gray.bold(query[x]);
                            else return yellow(query[x]);
                        })(query[x]);
                    }
                } else {
                    querystringified = cyan.bold(query);
                }
            }
                    
            console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.symbol.warning).red + ' - '.grey + '%s'.reset, now[0], now[1], now[2], now[3], now[4], msg);
            
            if (querystringified != '' && typeof querystringified !== 'undefined' && typeof query !== 'undefined') {
                if (typeof query == 'object') {
                    console.log('{\n%s\n}',querystringified);
                }
                else {
                    console.log('\n\t%s\n',querystringified);
                }
            }
        }
    } catch(error) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}

export function log(msg: string) {
	let now = getNow();
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.reset, now[0], now[1], now[2], now[3], now[4], msg);
    } catch(e) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}

export function error(text: string, obj?: object) {
    try {
		let now = getNow();

		let msg = text;
		let query = obj;
		let querystringified = '';
			
		if (typeof query !== 'undefined' && !Array.isArray(query)) {
			if (typeof query === 'object') {				
				for (var x in query) {

                    if (querystringified != '') 
                        querystringified += ', \n'.yellow;

					querystringified += '\t' + cyan(x) + ': '.yellow + ((key) => { 
						if (typeof key === 'number') return blue(query[x]);
						if (typeof key === 'string') return '\''.yellow + green(query[x]) + '\''.yellow;
						if (typeof key === 'boolean') return magenta(query[x]);
						if (typeof key === 'undefined') return gray.bold(query[x]);
						else return yellow(query[x]);
					})(query[x]);
				}
			} else {
				querystringified = cyan.bold(query);
			}
		}
				
		console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.symbol.error).red + ' - '.grey + '%s'.red, now[0], now[1], now[2], now[3], now[4], msg);
		
		if (querystringified != '' && typeof querystringified !== 'undefined' && typeof query !== 'undefined') {
			if (typeof query == 'object') {
				console.log('{\n%s\n}',querystringified);
			}
			else {
				console.log('\n\t%s\n',querystringified);
			}
		}
	} catch(e) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}

export function info(msg: string) {
	let now = getNow();
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.symbol.info).blue + ' - '.grey + '%s'.blue, now[0], now[1], now[2], now[3], now[4], msg);
    } catch(e) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}

export function success(msg: string) {
	let now = getNow();
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + 'h'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + (lutils.symbol.success).green.bold + ' - '.grey + '%s'.cyan, now[0], now[1], now[2], now[3], now[4], msg);
    } catch(e) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }   
}