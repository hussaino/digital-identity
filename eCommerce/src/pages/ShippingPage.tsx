import { IonContent, IonPage, IonList, IonButton, IonItemDivider, IonItem, IonInput, IonLabel } from '@ionic/react';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import './ShippingPage.css';

const Shipping: React.FC = () => {

  return (
    <IonPage>
      <HeaderComponent />
      <IonContent>
        <div className="shipping-title">Shipping Info</div>
        <IonList className="shipping-list-container">
          <IonItem className="two-columns-item">
            <IonLabel position="stacked">Country</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
          <IonItem className="two-columns-item">
            <IonLabel position="stacked">City</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
        </IonList>

        <IonList className="shipping-list-container">
          <IonItem className="one-column-item">
            <IonLabel position="stacked">Street</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
        </IonList>

        <IonList className="shipping-list-container">
          <IonItem className="one-column-item">
            <IonLabel position="stacked">House</IonLabel>
            <IonInput> </IonInput>
          </IonItem>
        </IonList>

        <div className="autofill-container">
          <IonButton className="autofill-button" color={'secondary'} >Absher Autofill</IonButton>
          <IonLabel>
            <p>retrieve address from Absher</p>
          </IonLabel>
        </div>

        <div className="shipping-payment">
          <p className="total-price">Total: 520SR</p>
          <IonButton color={'primary'} >Complete Payment</IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Shipping;
