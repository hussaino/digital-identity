import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from './../AppContext';
import { IonLoading, IonContent, IonToast, IonButton } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { establishWebSocket, requestCustomerInformation } from '../serverside';
import './HomeComponent.css';

const Component: React.FC = () => {
  const myContext: any = useContext(AppContext);
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [rejected, setRejected] = useState(false);

  // Run once on component start
  // useEffect(() => {
  //   openQRScanner();
  // }, []);

  const handleWebSocketResponse = (response: any, qrCodeContent: String) => {
    // New websocket response
    if (response.hasOwnProperty('connectionId')) {
      // Request information from customer
      requestCustomerInformation(response.connectionId, qrCodeContent);
    }
    // customerInfo response
    else if (response.hasOwnProperty('customerInfo')) {
      myContext.setCustomerInfo(response.customerInfo);
      openCustomerDetails();
    } else if (response.status && response.status === 'reject') {
      console.log('Customer Rejected the request');
      setRejected(true);
      setShowLoading(false);
    }
  };

  const openQRScanner = async () => {
    const data = await BarcodeScanner.scan();
    var qrCodeContent = data.text;
    console.log('openQRScanner() - scanned barcode:', qrCodeContent);

    // Establish a websocket connection
    if (qrCodeContent.length > 0) {
      setShowLoading(true);

      establishWebSocket(qrCodeContent, handleWebSocketResponse); // Open a WebSocket with the server
    }
  };

  const openCustomerDetails = () => {
    setShowLoading(false);
    history.push('/home/customer');
  };

  return (
    <IonContent>
      <IonButton onClick={() => openQRScanner()}>مسح باركود</IonButton>
      <IonLoading isOpen={showLoading} message={'...انتظار موافقة العميل'} />
      <IonToast
        isOpen={rejected}
        onDidDismiss={() => setRejected(false)}
        duration={2000}
        message="تم رفض الطلب"
      />
    </IonContent>
  );
};

export default Component;
