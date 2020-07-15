import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AppContext } from './../AppContext';
import { IonLoading, IonContent } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { establishWebSocket, requestCustomerInformation } from '../serverside'
import './HomeComponent.css';


const Component: React.FC = () => {
  const myContext: any = useContext(AppContext);
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);

  // Run once on component start
  useEffect(() => {
    openQRScanner();
  }, []);

  const handleWebSocketResponse = (response: any, qrCodeContent: String) => {
    // New websocket response 
    if (response.hasOwnProperty('connectionId')) {
      // Request information from customer
      requestCustomerInformation(response.connectionId, qrCodeContent);
    }
    // customerInfo response
    else if (response.hasOwnProperty('customerInfo')) {
      myContext.setCustomerInfo(response.customerInfo);
      openCustomerDetails()
    }

  }

  const openQRScanner = async () => {
    const data = await BarcodeScanner.scan();
    var qrCodeContent = data.text;
    console.log("openQRScanner() - scanned barcode:", qrCodeContent);

    // Establish a websocket connection 
    if (qrCodeContent.length > 0) {
      setShowLoading(true);

      establishWebSocket(qrCodeContent, handleWebSocketResponse); // Open a WebSocket with the server
    }
  };


  const openCustomerDetails = () => {
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
