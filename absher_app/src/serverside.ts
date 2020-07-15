import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);


// ------------------- WebSocket -------------------
export const establishWebSocket = (callback: any) => {
    var wss = new WebSocket('wss://sgyb5djk3h.execute-api.eu-central-1.amazonaws.com/dev');
    wss.onmessage = (event) => {
        console.log("WebSocket.onmessage:", JSON.parse(event.data));
        callback(JSON.parse(event.data))
    }
    wss.onerror = (error) => console.log("WebSocket.onerror:", { error });
    wss.onopen = () => wss.send(JSON.stringify({ action: 'requestQR', id: '123' }));
}


// ------------------- API calls -------------------
export async function authorizeAccess(businessData: string, approve: boolean, onSuccessCallback: any) {
    console.log("authorizeAccess():");
    var authorizeStatus = "";
    if (approve)
        authorizeStatus = "approve";
    else
        authorizeStatus = "reject";

    console.log("authorizeAccess() - businessData:", businessData);
    console.log("authorizeAccess() - authorizeStatus:", authorizeStatus);

    const apiName = 'ApiGatewayRestApi';
    const path = '/requests';
    const requestBody = {
        body: {
            "customerId": "123",
            "businessData": businessData,
            "status": authorizeStatus
        },
        headers: {},
    };

    return await API.put(apiName, path, requestBody).then((response: any) => {
        console.log("authorizeAccess() - response:", response);
        onSuccessCallback();
    }).catch((error: any) => {
        console.log("authorizeAccess() - error:", error);
    });
}