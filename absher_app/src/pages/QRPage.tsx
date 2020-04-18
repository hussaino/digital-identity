import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import QRComponent from '../components/QRComponent';
import './QRPage.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <HeaderComponent />
      <IonContent class="bg">
        <QRComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
