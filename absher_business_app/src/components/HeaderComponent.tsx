import React from 'react';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

const Component: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar mode="ios" color="light">
        <IonTitle>
          <img alt="logo" height="40" float-left src="assets/image/logo.png" />
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Component;
