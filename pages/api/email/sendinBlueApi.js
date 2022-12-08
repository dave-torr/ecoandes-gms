const SibApiV3Sdk = require('sib-api-v3-sdk');
import nextConnect from 'next-connect';

let defaultClient = SibApiV3Sdk.ApiClient.instance;
const { SENDING_BLUE_API } = process.env

const handler = nextConnect()


.get(async(req, res)=>{

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = SENDING_BLUE_API;

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let listId = 44;

    let opts = {
        'modifiedSince': new Date("2021-01-01T19:20:30+01:00"),
        'limit': 500,
        'offset': 0 
    };

    apiInstance.getContactsFromList(listId, opts).then(function(data) {
        res.status(200).json(data)
    }, function(error) {
        console.error(error);
    });
})

export default (req, res) => handler.run(req, res) 