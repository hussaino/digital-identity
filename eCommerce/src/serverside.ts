import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);

// ------------------- API calls -------------------
export async function getAuth() {
    let apiName = 'ApiGatewayRestApi';
    let path = '/auth';
    let myInit = {
        headers: { Authorization: `eyJraWQiOiJmRUNDMnBvcm9DRzdlRm1wNFdvOFhGSnlhbG1nRytrMmNyQWcxaGQ1ekZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1YWI3YWU4ZS1jMzUxLTRmNzYtODU1MS0xMTM3NGNmZGIzOWYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InJlc2NvdXJjZS1hcGlcL3JlYWRfaWRlbnRpdHkiLCJhdXRoX3RpbWUiOjE1ODg1MzgwMzcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzdYN1dhVTl3ZCIsImV4cCI6MTU4ODU0MTYzNywiaWF0IjoxNTg4NTM4MDM3LCJ2ZXJzaW9uIjoyLCJqdGkiOiIyMWE4OWZiNS0zODk1LTQwNDUtOGU5ZS00ZjkxNjNiOWE4NjYiLCJjbGllbnRfaWQiOiIybjQ5ZXBkb2xuZTdobWo0a2FjZnQxcGhrMyIsInVzZXJuYW1lIjoiNWFiN2FlOGUtYzM1MS00Zjc2LTg1NTEtMTEzNzRjZmRiMzlmIn0.krh7nVGWxR33qIncEc226PncYenB635ujJIflxxqy3MRToABhNEEaBXuQfZGKuO9aUupxaoE5fMh-h0mPQtAUDa2bjabyo-9GMFA5fO0l92LLnWcgmxwn8ZS-P3RFzrRFRWw25oHlOplXhN8gvDKstEppNDBrLRS-G-4KSjDodfgcX0QcZHAHGlHj7TKe-Wbz2_BZXai9_gNFqV8YQsBtlPQwfcsQ0KYF2TXast2dmKhuUYjxtChPU5v4GgTUYb7oHeo3wty0h6Mz6ca03t9nkvgKxxD8MVjySsEMg9mhCoYoLsrEIvNuGdYIEtgwyYktFlPuoQ3-4dNtBf1GelwRg` },
    };
    return await API.get(apiName, path, myInit).then((response: any) => {
        console.log("getAuth() - response:", response);
    }).catch((error: any) => {
        console.log("getAuth() - error:", error);
    });
};