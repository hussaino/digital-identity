import React, { useState, useEffect, useContext } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useHistory } from 'react-router-dom'
import { AppContext } from './../AppContext';
import { IonLoading, IonContent } from '@ionic/react';
import { establishWebSocket } from '../serverside'
import './QRComponent.css';


const QRComponent: React.FC = () => {
  const myContext: any = useContext(AppContext);
  const [qrContent, setQrContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  // Run once on component start
  useEffect(() => {
    establishWebSocket(handleWebSocketResponse); // Open a WebSocket with the server

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWebSocketResponse = (response: any) => {
    // QR content response 
    if (response.hasOwnProperty('qr')) {
      setQrContent(response.qr);
      setIsLoading(false);
    }
    // authorizationRequest response
    else if (response.hasOwnProperty('requestedInfo')) {
      myContext.setBusinessData(response.businessData);
      myContext.setRequestedInfo(response.requestedInfo);
      goToPermissionPage()
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

  const goToPermissionPage = () => {
    history.push('/home/permission');
  }

  return (
    isLoading ? showLoading() : showQR()
  );


}

export default QRComponent;

