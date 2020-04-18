import React from 'react';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';

const Component: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar mode="ios" color="light">
        <IonButtons slot="start">
          <IonMenuButton autoHide={false} color="primary" />
        </IonButtons>
        <IonTitle>
          <img alt="logo" height="40" float-left src="assets/image/absher-title.png" />
        </IonTitle>
        <img slot="end" alt="logo" height="40" float-left src="assets/image/logo.png" />
      </IonToolbar>
    </IonHeader>
  );
};

export default Component;
