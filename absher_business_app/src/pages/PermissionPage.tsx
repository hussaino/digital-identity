import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import PermissionComponent from '../components/PermissionComponent'

const Home: React.FC = () => {
  return (
    <IonPage>
      <HeaderComponent />
      <IonContent class="bg">
        <PermissionComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
