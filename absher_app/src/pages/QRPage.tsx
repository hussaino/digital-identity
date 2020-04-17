import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import QRComponent from '../components/QRComponent';
import './QRPage.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank123</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <QRComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
