"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const request_1 = __importDefault(require("request"));
class Utils {
    constructor() {
    }
    static getRequestOptions(zalo_api_type) {
        let requestOptions = Utils.requestOptions;
        if (zalo_api_type === enums_1.ZALO_API_TYPE.OFFICIAL_ACCOUNT_API) {
            requestOptions.url = 'https://openapi.zalo.me/v2.0/oa/';
        }
        else if (zalo_api_type === enums_1.ZALO_API_TYPE.SOCIAL_API) {
            requestOptions.url = 'https://openapi.zalo.me/v2.0/oa/';
        }
        else {
            requestOptions.url = 'https://openapi.zalo.me/v2.0/oa/';
        }
        return JSON.parse(JSON.stringify(requestOptions));
    }
    static sendMessage(options, requestData, cb) {
        options.qs.access_token = requestData.token;
        if (requestData.hasOwnProperty('proxy')) {
            options.proxy = requestData.proxy;
        }
        if (typeof cb != 'function') {
            return new Promise((resolve, reject) => {
                request_1.default(options, (error, _response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (!((typeof body === 'object' && !Array.isArray(body) && body !== null))) {
                            const bodyObject = JSON.parse(body);
                            if (bodyObject.error) {
                                reject(bodyObject);
                            }
                            else {
                                resolve(bodyObject);
                            }
                        }
                        else {
                            resolve(body);
                        }
                    }
                });
            });
        }
        else {
            request_1.default(options, (error, _response, body) => {
                if (error) {
                    return cb(error);
                }
                if (body.error) {
                    return cb(body.error.message);
                }
                cb(null, body);
            });
            return Promise.resolve();
        }
    }
    static getProxyData(requestData, proxyData) {
        if (proxyData) {
            if (Object.prototype.toString.call(proxyData) === '[object Object]' && proxyData.hasOwnProperty('hostname') && proxyData.hasOwnProperty('port')) {
                if (proxyData.hostname.indexOf('http') === 0) {
                    requestData.proxy = `${proxyData.hostname}:${proxyData.port}`;
                }
                else {
                    requestData.proxy = `http://${proxyData.hostname}:${proxyData.port}`;
                }
            }
            else {
                throw new Error('Invalid Proxy object given, expected hostname and port');
            }
        }
        return requestData;
    }
}
exports.Utils = Utils;
Utils.requestOptions = {
    url: '',
    qs: {
        access_token: undefined
    },
    method: undefined
};
//# sourceMappingURL=Utils.js.map