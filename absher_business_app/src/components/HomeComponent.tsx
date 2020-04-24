import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { IonLoading, IonContent } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { establishWebSocket, requestCustomerInformation } from '../serverside'
import './HomeComponent.css';

const Component: React.FC = () => {

  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  const [qrContent, setQrContent] = useState("");

  // Run once on component start
  useEffect(() => {
    openQRScanner();
  }, []);


  const openQRScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);

    // Establish a websocket connection 
    if (data.text.length > 0) {
      setShowLoading(true);
      setQrContent(data.text);

      establishWebSocket(handleWebSocketResponse); // Open a WebSocket with the server
    }
  };

  const handleWebSocketResponse = (response: any) => {
    console.log(`handleWebSocketResponse - ID: ${response.connectionId}`);

    // Request information from customer
    requestCustomerInformation(response.connectionId, qrContent);
  }


  const openCustomerDetails = () => {
    //e.preventDefault();
    setShowLoading(false);
    history.push('/home/customer');
  }


  return (
    <IonContent>
      <IonLoading
        isOpen={showLoading}
        message={'...انتظار موافقة العميل'}
      />
    </IonContent>
  );
};

export default Component;
