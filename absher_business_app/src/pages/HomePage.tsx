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
        <HomeComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
