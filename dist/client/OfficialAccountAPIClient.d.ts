import { ProxyData } from "../interfaces";
import { ATTACHMENT_TYPE } from "../enums";
export interface MessagePayload {
    text?: string;
    attachment?: Object;
}
export interface AttachmentPayload {
    type: ATTACHMENT_TYPE;
    payload: Object;
}
export declare class OfficialAccountAPIClient {
    private requestData;
    constructor(token: string, proxyData?: ProxyData);
    getUserProfile(id: string, cb?: Function): Promise<unknown>;
    sendTextMessage(id: string, text: string, cb?: Function): Promise<unknown>;
    sendListTemplateMessage(id: string, elements?: Object[], buttons?: Object[], cb?: Function): Promise<unknown>;
    sendMediaTemplateMessage(id: string, text: string, elements?: Object[], buttons?: Object[], cb?: Function): Promise<unknown>;
    private sendDisplayMessage;
    private generateOARequestPayload;
}
