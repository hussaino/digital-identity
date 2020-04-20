import { IonContent, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import HomeComponent from '../components/HomeComponent';
import './HomePage.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <HeaderComponent />
      <IonContent>
        <IonToolbar mode="ios" class="toolbar-bg">
          <IonTitle class="top-padding">
            <img alt="logo" height="48" float-left src="assets/image/toolbar-buttons.png" />
          </IonTitle>
        </IonToolbar>
        <HomeComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
