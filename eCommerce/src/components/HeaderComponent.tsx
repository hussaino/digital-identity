import React from 'react';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './HeaderComponent.css';

const Component: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar color="light">
        <IonTitle slot="start">
          <div className="header-container">
            <img alt="cart" height="20" float-left src="assets/icon/shopping_cart.png" />
            <span >eCommerce</span>
          </div>
        </IonTitle>
        <IonTitle slot="end">
          <span >Balance: 1000SR</span>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Component;
