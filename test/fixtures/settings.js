"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function settings() {
    var r = {
        system: {
            name: 'test',
            APIid: 'test',
            v: 'v1',
            basePath: '/api',
            docPath: '/doc',
            enableProxy: false,
            loginRequired: true,
            debug: true,
            db: {},
            sessionName: 'test'
        },
        auth: {},
        permissions: {
            access: {
                groups: [],
                users: []
            },
            consumer: {
                hostnames: []
            }
        },
        jwt: {
            secret: 'test',
            expirationTime: 60 * 60 * 2
        }
    };
    if (process.env.NODE_ENV == 'production') {
        r.permissions = __assign({}, r.permissions, { consumer: {
                hostnames: []
            } });
        r.system = __assign({}, r.system, { db: {
                saj: {
                    
                },
                projudi: {
                    
                }
            } });
    }
    else {
        r.permissions = __assign({}, r.permissions, { consumer: {
                hostnames: []
            } });
        r.system = __assign({}, r.system, { db: {
                saj: {
                    
                },
                projudi: {
                    
                }
            } });
    }
    return r;
}
exports.default = settings;