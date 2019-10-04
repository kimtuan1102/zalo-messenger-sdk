import {RequestData, Utils} from "../util/Utils";
import {ProxyData} from "../interfaces";
import {ATTACHMENT_TYPE, TEMPLATE_TYPE, ZALO_API_TYPE} from "../enums";

export interface MessagePayload {
    text?: string,
    attachment?: Object
}

export interface AttachmentPayload {
    type: ATTACHMENT_TYPE,
    payload: Object

}

export class OfficialAccountAPIClient {
    private requestData: RequestData;

    public constructor(token: string, proxyData?: ProxyData) {
        this.requestData = {token}
        this.requestData = Utils.getProxyData(this.requestData, proxyData)
    }


    public getUserProfile(id: string, cb?: Function) {
        let data = `{"user_id":"${id}"}`
        const options = Utils.getRequestOptions(ZALO_API_TYPE.OFFICIAL_ACCOUNT_API)
        options.url += 'getprofile'
        options.qs.data = data
        options.method = 'GET'
        return Utils.sendMessage(options, this.requestData, cb)
    }

    public sendTextMessage(id: string, text: string, cb?: Function) {
        return this.sendDisplayMessage(id, {text}, cb)
    }

    public sendListTemplateMessage(id: string, elements?: Object[], buttons?: Object[], cb?: Function) {
        const attachment = {type: ATTACHMENT_TYPE.TEMPLATE, payload: {template_type: TEMPLATE_TYPE.LIST, elements: elements, buttons:buttons}}
        return this.sendDisplayMessage(id, {attachment: attachment}, cb)
    }

    public sendMediaTemplateMessage(id: string, text:string, elements?: Object[], buttons?:Object[], cb?: Function){
        const attachment = {type:ATTACHMENT_TYPE.TEMPLATE, payload: {template_type: TEMPLATE_TYPE.MEDIA, elements:elements, buttons:buttons}}
        return this.sendDisplayMessage(id, {text: text, attachment:attachment}, cb)
    }

    private sendDisplayMessage(id: string, payload: MessagePayload, cb?: Function) {
        const options = this.generateOARequestPayload(id)
        options.json = {...options.json, message: payload}
        console.log(JSON.stringify(options.json))
        return Utils.sendMessage(options, this.requestData, cb)
    }

    private generateOARequestPayload(id: string) {
        const options = Utils.getRequestOptions(ZALO_API_TYPE.OFFICIAL_ACCOUNT_API)
        options.url += 'message'
        options.method = 'POST'
        options.json = {
            recipient: {
                "user_id": id
            },
        }
        return options
    }
}
