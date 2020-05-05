import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);

// ------------------- API calls -------------------
export async function getAuth() {
    let apiName = 'ApiGatewayRestApi';
    let path = '/auth';
    let myInit = {
        headers: { Authorization: `eyJraWQiOiJmRUNDMnBvcm9DRzdlRm1wNFdvOFhGSnlhbG1nRytrMmNyQWcxaGQ1ekZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1YWI3YWU4ZS1jMzUxLTRmNzYtODU1MS0xMTM3NGNmZGIzOWYiLCJldmVudF9pZCI6ImRiYzM2ZjU5LThhYjktNDk4OS1hMDU5LTUxMGY3MDk5MDBlOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicmVzY291cmNlLWFwaVwvcmVhZF9pZGVudGl0eSIsImF1dGhfdGltZSI6MTU4ODcwMTQ2MSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfN1g3V2FVOXdkIiwiZXhwIjoxNTg4NzA1MDYxLCJpYXQiOjE1ODg3MDE0NjEsInZlcnNpb24iOjIsImp0aSI6IjE1Njc5OTc4LTAyYzctNDM2ZS05NzI1LThmYWUzMGZkYjM0OSIsImNsaWVudF9pZCI6IjJuNDllcGRvbG5lN2htajRrYWNmdDFwaGszIiwidXNlcm5hbWUiOiI1YWI3YWU4ZS1jMzUxLTRmNzYtODU1MS0xMTM3NGNmZGIzOWYifQ.UDLHby_qKwldvAWssc5u1nHYrq4BfEEv4Cd4IifqQLZcf3awSobRfB-3MtrBJwTxqxOJiQwiPp-LapbcuPAOC4YK8CWmDW732wwbPgy9od9iGMQaA0DFc_H24kmZMLLWwTAKs-hDl-o3S56ze0BtDyUD99PWFI6_lcpfdLeyWdUVqe38WHontunWoc7SYODk6De-RrolK6_CVbW-s99hEpD_yRzYOj4WBYqyBtMRZ5yXKHEbWKpPTBtypW0slGgaLyChyliDcXDsBRPaINR3TK7q7g1juaKMNhqck1qUb_-eK0NNWmFLJh80TRi4Tvnoyy2y6Nfeyfm7Pq8Gvv0gUA` },
    };
    return await API.get(apiName, path, myInit).then((response: any) => {
        console.log("getAuth() - response:", response);
    }).catch((error: any) => {
        console.log("getAuth() - error:", error);
    });
};