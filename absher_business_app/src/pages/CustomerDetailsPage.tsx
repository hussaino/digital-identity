import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import CustomerDetailsComponent from '../components/CustomerDetailsComponent'

const Home: React.FC = () => {
  return (
    <IonPage>
      <HeaderComponent />
      <IonContent class="bg">
        <CustomerDetailsComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
