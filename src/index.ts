import * as lutils from 'log-utils';
import { yellow, cyan, blue, green, magenta, gray, red } from 'colors';
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

export function debug(text: string, obj?: object) {
    try {
        if (settings.system.debug) {
            let date = new Date();
            let today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];

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
                    
            console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.warning).red + ' ' +  settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s', today[0], today[1], today[2], today[3], today[4], msg);
            
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
	let date = new Date();
    let today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.reset, today[0], today[1], today[2], today[3], today[4], msg);
    } catch(e) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}

export function error(text: string, obj?: object) {
    try {
		let date = new Date();
		let today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];

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
				
		console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.error).red + ' ' +  settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.red, today[0], today[1], today[2], today[3], today[4], msg);
		
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
	let date = new Date();
    let today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.info).blue + ' ' +  settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.blue, today[0], today[1], today[2], today[3], today[4], msg);
    } catch(e) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }
}

export function success(msg: string) {
	let date = new Date();
    let today = [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    try {
        console.log('['.gray.bold + '%s'.grey + '/'.grey + '%s'.grey + '/'.grey + '%s'.grey + ', às '.grey + '%s'.grey + ':'.grey + '%s'.grey + '] '.gray.bold + (lutils.symbol.success).green.bold + ' ' +  settings.system.APIid.toString().green + ' ' + (settings.system.v.toString()).green + ' :: '.cyan + '%s'.cyan, today[0], today[1], today[2], today[3], today[4], msg);
    } catch(e) {
        throw new GenericErrorException('É necessário configurar as settings do sistema no utilitário de log usando o método .setSettings().');
    }   
}