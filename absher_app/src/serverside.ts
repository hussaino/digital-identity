import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);


// ------------------- WebSocket -------------------
export const establishWebSocket = (callback: any) => {
    var wss = new WebSocket('wss://sgyb5djk3h.execute-api.eu-central-1.amazonaws.com/dev');
    wss.onmessage = (event) => {
        console.log(JSON.parse(event.data));
        callback(JSON.parse(event.data))
    }
    wss.onerror = (error) => console.log({ error });
    wss.onopen = () => wss.send(JSON.stringify({ action: 'requestQR', id: '123' }));
}


// ------------------- API calls -------------------
export async function getMyId() {
    const apiName = 'ApiGatewayRestApi';
    const path = '/customers/123';
    const myInit = {
        body: {},
        headers: {},
    };

    return await API.get(apiName, path, myInit).then((response: any) => {
        console.log(response);
    }).catch((error: any) => {
        console.log(error.response)
    });
}