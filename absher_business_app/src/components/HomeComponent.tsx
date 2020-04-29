import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { IonLoading, IonContent } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { establishWebSocket, requestCustomerInformation } from '../serverside'
import './HomeComponent.css';


const handleWebSocketResponse = (websocketId: String, qrCodeContent: String) => {
  // Request information from customer
  requestCustomerInformation(websocketId, qrCodeContent);
}

const Component: React.FC = () => {

  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);

  // Run once on component start
  useEffect(() => {
    openQRScanner();
  }, []);


  const openQRScanner = async () => {
    const data = await BarcodeScanner.scan();
    var qrCodeContent = data.text;
    console.log(`Barcode data: ${qrCodeContent}`);

    // Establish a websocket connection 
    if (qrCodeContent.length > 0) {
      setShowLoading(true);

      establishWebSocket(qrCodeContent, handleWebSocketResponse); // Open a WebSocket with the server
    }
  };


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
