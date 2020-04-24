import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);


// ------------------- WebSocket -------------------
export const establishWebSocket = (qrCodeContent: String, callback: any) => {
    var wss = new WebSocket('wss://sgyb5djk3h.execute-api.eu-central-1.amazonaws.com/dev');
    wss.onmessage = (event) => {
        console.log(JSON.parse(event.data));
        callback(JSON.parse(event.data).connectionId, qrCodeContent)
    }
    wss.onerror = (error) => console.log({ error });
    wss.onopen = () => wss.send(JSON.stringify({ action: 'connectionId' }));
}


// ------------------- API calls -------------------
export async function requestCustomerInformation(websocketId: String, qrContent: String) {
    console.log("requestCustomerInformation():");
    console.log(websocketId);
    console.log(qrContent);
    const apiName = 'ApiGatewayRestApi';
    const path = '/requests';
    const myInit = {
        body: {
            "businessId": "456",
            "businessWS": websocketId,
            "customerQR": qrContent
        },
        headers: {},
    };
    console.log("myInit");
    console.log(myInit);


    return await API.post(apiName, path, myInit).then((response: any) => {
        console.log("requestCustomerInformation - response:");
        console.log(response);
    }).catch((error: any) => {
        console.log("requestCustomerInformation - error:");
        console.log(error);
    });
}