import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import HomeComponent from '../components/HomeComponent';
import './HomePage.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <HomeComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
