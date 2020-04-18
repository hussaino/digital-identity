import React, { useState } from 'react';
import {QRCode} from 'react-qrcode-logo';
import './QRComponent.css';


const QRComponent: React.FC = () => {
  const [ url, setURL ] = useState("http://facebook.github.io/react/");

  return (
    <div className="qr-container">
      
      <QRCode 
      value={url}
      size={300}
      logoImage="assets/image/logo-bg.png"
      logoWidth={40}
      logoOpacity={1}
      ecLevel='H'
      />
    </div>
  );
  
}

export default QRComponent;

