import { ProxyData } from "../interfaces";
import { ZALO_API_TYPE } from "../enums";
export interface RequestOptions {
    url: string;
    qs: {
        access_token?: string;
        data?: string;
    };
    method?: string;
    proxy?: Object;
    json?: Object;
}
export interface RequestData {
    token: string;
    proxy?: string;
}
export declare class Utils {
    private static requestOptions;
    private constructor();
    static getRequestOptions(zalo_api_type: ZALO_API_TYPE): RequestOptions;
    static sendMessage(options: RequestOptions, requestData: RequestData, cb?: Function): Promise<unknown>;
    static getProxyData(requestData: RequestData, proxyData?: ProxyData): RequestData;
}
