import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { IonLoading, IonContent } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import './HomeComponent.css';


const Component: React.FC = () => {

  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
  };

  // Run once on component start
  useEffect(() => {
    openScanner();
  }, []);


  const openCustomerDetails = () => {
    //e.preventDefault();
    setShowLoading(false);
    history.push('/home/customer');
  }


  return (
    <IonContent>
      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => openCustomerDetails()}
        message={'...انتظار موافقة العميل'}
        duration={3000}
      />
    </IonContent>
  );
};

export default Component;
