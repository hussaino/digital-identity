import React, { useState } from 'react';
import {IonInput, IonItem} from '@ionic/react';
import {QRCode} from 'react-qrcode-logo';
import './QRComponent.css';


const QRComponent: React.FC = () => {
  const [ url, setURL ] = useState("http://facebook.github.io/react/");

  const handleInputChange =(e: any) => {
    setURL(e.target.value);
  }

  return (
    <div className="container">
      <IonItem>
        <IonInput value={url} placeholder="Enter Input" onIonChange={(e: any) => handleInputChange(e)}></IonInput>
      </IonItem>
      <QRCode 
      value={url}
      logoImage="assets/logo.png"
      logoWidth={40}
      logoOpacity={1}
      ecLevel='H'
      />
    </div>
  );
  
}

export default QRComponent;

