"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../util/Utils");
const enums_1 = require("../enums");
class OfficialAccountAPIClient {
    constructor(token, proxyData) {
        this.requestData = { token };
        this.requestData = Utils_1.Utils.getProxyData(this.requestData, proxyData);
    }
    getUserProfile(id, cb) {
        let data = `{"user_id":"${id}"}`;
        const options = Utils_1.Utils.getRequestOptions(enums_1.ZALO_API_TYPE.OFFICIAL_ACCOUNT_API);
        options.url += 'getprofile';
        options.qs.data = data;
        options.method = 'GET';
        return Utils_1.Utils.sendMessage(options, this.requestData, cb);
    }
    sendTextMessage(id, text, cb) {
        return this.sendDisplayMessage(id, { text }, cb);
    }
    sendListTemplateMessage(id, elements, buttons, cb) {
        const attachment = { type: enums_1.ATTACHMENT_TYPE.TEMPLATE, payload: { template_type: enums_1.TEMPLATE_TYPE.LIST, elements: elements, buttons: buttons } };
        return this.sendDisplayMessage(id, { attachment: attachment }, cb);
    }
    sendMediaTemplateMessage(id, text, elements, buttons, cb) {
        const attachment = { type: enums_1.ATTACHMENT_TYPE.TEMPLATE, payload: { template_type: enums_1.TEMPLATE_TYPE.MEDIA, elements: elements, buttons: buttons } };
        return this.sendDisplayMessage(id, { text: text, attachment: attachment }, cb);
    }
    sendDisplayMessage(id, payload, cb) {
        const options = this.generateOARequestPayload(id);
        options.json = Object.assign(Object.assign({}, options.json), { message: payload });
        console.log(JSON.stringify(options.json));
        return Utils_1.Utils.sendMessage(options, this.requestData, cb);
    }
    generateOARequestPayload(id) {
        const options = Utils_1.Utils.getRequestOptions(enums_1.ZALO_API_TYPE.OFFICIAL_ACCOUNT_API);
        options.url += 'message';
        options.method = 'POST';
        options.json = {
            recipient: {
                "user_id": id
            },
        };
        return options;
    }
}
exports.OfficialAccountAPIClient = OfficialAccountAPIClient;
//# sourceMappingURL=OfficialAccountAPIClient.js.map