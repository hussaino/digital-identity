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
        headers: { Authorization: `eyJraWQiOiJmRUNDMnBvcm9DRzdlRm1wNFdvOFhGSnlhbG1nRytrMmNyQWcxaGQ1ekZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1YWI3YWU4ZS1jMzUxLTRmNzYtODU1MS0xMTM3NGNmZGIzOWYiLCJldmVudF9pZCI6ImU2YjdhYzVlLTc5ZjktNGI1Ni04M2VjLWE2MDcxNDhhMTVlYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicmVzY291cmNlLWFwaVwvcmVhZF9pZGVudGl0eSIsImF1dGhfdGltZSI6MTU4NzczMTMyNiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfN1g3V2FVOXdkIiwiZXhwIjoxNTg3NzM0OTI2LCJpYXQiOjE1ODc3MzEzMjYsInZlcnNpb24iOjIsImp0aSI6IjAxYmM3ZmQ0LWE5OGYtNDdmOS05MThkLWUyZWY3Nzc3OGYyZCIsImNsaWVudF9pZCI6IjJuNDllcGRvbG5lN2htajRrYWNmdDFwaGszIiwidXNlcm5hbWUiOiI1YWI3YWU4ZS1jMzUxLTRmNzYtODU1MS0xMTM3NGNmZGIzOWYifQ.oLyEnR5iRHjdKn9sFwMbVh7tOHdSWw3avqXyu4ODVG1GocwZJCzF68VwAD6T0mKOdou1ElLX4DVwaJYO8A7VX1R4C4UHftkHT-CtP-BsB8znj4hum6luMC8iuKscbQu9o2t6DcdHKP7pKfzLzVRaG59jBdoOi7iFeV6t-yvH2vmTvIcDPF5LtUSs3PWvcBVx47oYayoWz9W_4DEJ1skg0WL0T-0HyRfjNyX0N69rfd40vwIki5fyv1H_uhlULGRjCLNN-O8TSGzD7G8woJY_2fxnQfVLTdVPtATD73xcSAzQQoji7fydNXq26b28EugWygpEZTy-fURVUrwl3L30Iw` },
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
