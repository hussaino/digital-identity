import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Amplify, { API } from 'aws-amplify';
import awsmobile from './aws-exports';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { log } from 'util';

// Configure Amplify
Amplify.configure(awsmobile);

const apiCall = async () => {
    let apiName = 'ApiGatewayRestApi';
    let path = '/auth';
    let myInit = {
        headers: { Authorization: `eyJraWQiOiJmRUNDMnBvcm9DRzdlRm1wNFdvOFhGSnlhbG1nRytrMmNyQWcxaGQ1ekZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1YWI3YWU4ZS1jMzUxLTRmNzYtODU1MS0xMTM3NGNmZGIzOWYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6InJlc2NvdXJjZS1hcGlcL3JlYWRfaWRlbnRpdHkiLCJhdXRoX3RpbWUiOjE1ODc3Mjc3NzIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzdYN1dhVTl3ZCIsImV4cCI6MTU4NzczMTM3MiwiaWF0IjoxNTg3NzI3NzcyLCJ2ZXJzaW9uIjoyLCJqdGkiOiJhMjc0OWI5ZC02MmVkLTRmNDktYmUxMS02YmNmMzUzOGUwMTUiLCJjbGllbnRfaWQiOiIybjQ5ZXBkb2xuZTdobWo0a2FjZnQxcGhrMyIsInVzZXJuYW1lIjoiNWFiN2FlOGUtYzM1MS00Zjc2LTg1NTEtMTEzNzRjZmRiMzlmIn0.x8-hEF20B1-2hYZZQFxat8COCu3C9_Ahdf_u9UxE6YaEb-2-4v5tSONuUXYTT6k0ZFnajHpCSbamcs8xlEoESSWC9zTrQDv1Yt4azwhAnCt0l2mpKLW_wrJWc8iJtaVN_v9OOC7qBF1RQ4xQYeuV-WwVR31ISEPhe3aPaWuxoSZHNQoOwMBXWMLVU5JDhwgzx6bXkp5Yo5IYH-WbV2n9GD1yphOItVoqMplFv4AWuIyvYfJjWzVAF9-qTvswO5cwHSBVQEz3JbxfNIW2OXtlxuyOLEUkRHaXT0g2LaH66f-KbhfX2HsiztBWXrUEtAmo30VUX4_fE96pog5ouKwAgg` },
    };
    return await API.get(apiName, path, myInit);
};


const App: React.FC = () => (

    <IonButton color={'primary'} onClick={()=> console.log(apiCall())}>Retrieve Address</IonButton>
    // <IonApp>
    //     <IonReactRouter>
    //
    //     </IonReactRouter>
    // </IonApp>
);

export default App;
