import {ProxyData} from "../interfaces";
import {ZALO_API_TYPE} from "../enums";
import request from 'request';

export interface RequestOptions {
    url: string,
    qs: {
        access_token?: string,
        data?: string
    }
    method?: string,
    proxy?: Object,
    json?: Object
}

export interface RequestData {
    token: string;
    proxy?: string;
}

export class Utils {

    private static requestOptions: RequestOptions = {
        url: '',
        qs: {
            access_token: undefined
        },
        method: undefined
    }

    private constructor() {
    }

    public static getRequestOptions(zalo_api_type: ZALO_API_TYPE): RequestOptions {
        let requestOptions = Utils.requestOptions
        if (zalo_api_type === ZALO_API_TYPE.OFFICIAL_ACCOUNT_API) {
            requestOptions.url = 'https://openapi.zalo.me/v2.0/oa/'
        } else if (zalo_api_type === ZALO_API_TYPE.SOCIAL_API) {
            requestOptions.url = 'https://openapi.zalo.me/v2.0/oa/'
        } else {
            requestOptions.url = 'https://openapi.zalo.me/v2.0/oa/'
        }
        return JSON.parse(JSON.stringify(requestOptions))

    }

    public static sendMessage(options: RequestOptions, requestData: RequestData, cb?: Function) {
        options.qs.access_token = requestData.token
        if (requestData.hasOwnProperty('proxy')){
            options.proxy = requestData.proxy
        }
        if (typeof cb != 'function') {
            return new Promise((resolve, reject) => {
                request(options, (error, _response, body) => {
                    if (error) {
                        reject(error)
                    } else {
                        if (!((typeof body === 'object' && !Array.isArray(body) && body !== null))) {
                            const bodyObject = JSON.parse(body)
                            if (bodyObject.error) {
                                reject(bodyObject)
                            } else {
                                resolve(bodyObject)
                            }
                        } else {
                            resolve(body)
                        }
                    }
                })
            });
        } else {
            request(options, (error, _response, body) => {
                if (error) {
                    return cb(error)
                }
                if (body.error) {
                    return cb(body.error.message)
                }
                cb(null, body);
            });
            return Promise.resolve()
        }
    }

    public static getProxyData(requestData: RequestData, proxyData ?: ProxyData) {
        if (proxyData) {
            if (Object.prototype.toString.call(proxyData) === '[object Object]' && proxyData.hasOwnProperty('hostname') && proxyData.hasOwnProperty('port')) {
                if (proxyData.hostname.indexOf('http') === 0) {
                    requestData.proxy = `${proxyData.hostname}:${proxyData.port}`
                } else {
                    requestData.proxy = `http://${proxyData.hostname}:${proxyData.port}`
                }
            } else {
                throw new Error('Invalid Proxy object given, expected hostname and port');
            }
        }
        return requestData
    }
}
