import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);


// ------------------- WebSocket -------------------
export const establishWebSocket = (qrCodeContent: String, callback: any) => {
    var wss = new WebSocket('wss://sgyb5djk3h.execute-api.eu-central-1.amazonaws.com/dev');
    wss.onmessage = (event) => {
        console.log("WebSocket.onmessage:", JSON.parse(event.data));
        callback(JSON.parse(event.data), qrCodeContent)
    }
    wss.onerror = (error) => console.log("WebSocket.onerror:", { error });
    wss.onopen = () => wss.send(JSON.stringify({ action: 'connectionId' }));
}


// ------------------- API calls -------------------
export async function requestCustomerInformation(websocketId: String, qrContent: String) {
    console.log("requestCustomerInformation():");
    console.log("requestCustomerInformation() - businessWS:", websocketId);
    console.log("requestCustomerInformation() - customerQR:", qrContent);

    const apiName = 'ApiGatewayRestApi';
    const path = '/requests';
    const requestBody = {
        body: {
            "businessId": "456",
            "businessWS": websocketId,
            "customerQR": qrContent
        },
        headers: {},
    };

    return await API.post(apiName, path, requestBody).then((response: any) => {
        console.log("requestCustomerInformation() - response:", response);
    }).catch((error: any) => {
        console.log("requestCustomerInformation() - error:", error);
    });
}