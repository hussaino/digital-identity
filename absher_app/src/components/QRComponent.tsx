import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useHistory } from 'react-router-dom'
import { IonLoading, IonContent } from '@ionic/react';
import { establishWebSocket } from '../serverside'
import './QRComponent.css';


const QRComponent: React.FC = () => {
  const [qrContent, setQrContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  // Run once on component start
  useEffect(() => {
    establishWebSocket(handleWebSocketResponse); // Open a WebSocket with the server
  }, []);

  const handleWebSocketResponse = (response: any) => {
    // QR content response 
    if (response.hasOwnProperty('qr')) {
      setQrContent(response.qr);
      setIsLoading(false);
    }
    // authorizationRequest response
    else if (response.hasOwnProperty('requestedInfo')) {
      goToPermissionPage(response)
    }

  }

  const showLoading = () => {
    return (
      <IonContent>
        <IonLoading
          isOpen={isLoading}
          message={'...جاري تحميل الباركود'}
        />
      </IonContent>
    )
  }

  const showQR = () => {
    return (
      <div className="qr-container">
        <QRCode
          value={qrContent}
          size={300}
          logoImage="assets/image/logo-bg.png"
          logoWidth={40}
          logoOpacity={1}
          ecLevel='H'
        />
      </div>
    )
  }

  const goToPermissionPage = (busniessData: any) => {
    history.push('/home/permission', { busniessData: busniessData });
  }

  return (
    isLoading ? showLoading() : showQR()
  );


}

export default QRComponent;

