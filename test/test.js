const assert = require('assert');
const settings = require('./fixtures/settings').default;
const utils = require('../dist/');

utils.setSettings(settings());

describe('Logging Utils', function () {
    describe('# logging básico', function () {

        it('deve imprimir um log básico', function () {

            return new Promise((resolve, reject) => {
                try {
                    utils.log('teste');
                    resolve();
                } catch (e) {
                    reject(new Error(e));
                }
            });
        });

        it('deve imprimir um log do tipo info', function () {


            return new Promise((resolve, reject) => {
                try {
                    utils.info('informação');
                    resolve();
                } catch (e) {
                    reject(new Error(e));
                }
            });
        });

        it('deve imprimir um log do tipo erro', function () {


            return new Promise((resolve, reject) => {
                try {
                    utils.error('erro');
                    resolve();
                } catch (e) {
                    reject(new Error(e));
                }
            });
        });

        it('deve imprimir um log do tipo sucesso', function () {


            return new Promise((resolve, reject) => {
                try {
                    utils.success('sucesso');
                    resolve();
                } catch (e) {
                    reject(new Error(e));
                }
            });
        });

        it('deve imprimir um log do tipo debug', function () {


            return new Promise((resolve, reject) => {
                try {
                    utils.debug('debug',{a:1,b:2,c:3});
                    resolve();
                } catch (e) {
                    reject(new Error(e));
                }
            });
        });
    });

    describe('# logging complexo', function () {

        it('deve imprimir um log do tipo debug com objeto composto por diferentes valores', function () {


            return new Promise((resolve, reject) => {
                try {
                    utils.debug('debug',{a:1,b:2,c:3,d:[1,2,3],e:{f:1,g:[4,5]}});
                    resolve();
                } catch (e) {
                    reject(new Error(e));
                }
            });
        });

        it('deve imprimir um log do tipo debug com atributos null, undefined e NaN', function () {


            return new Promise((resolve, reject) => {
                try {
                    utils.debug('debug',{a:undefined,b:0,c:null,d:[1,null,3],e:{f:undefined,g:[4,5]},h:(Math.sin('a'))});
                    resolve();
                } catch (e) {
                    reject(new Error(e));
                }
            });
        });
    });
});
