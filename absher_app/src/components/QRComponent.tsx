import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useHistory } from 'react-router-dom'
import './QRComponent.css';


const QRComponent: React.FC = () => {
  const [url] = useState("http://facebook.github.io/react/");

  const history = useHistory();

  const openPermissionPage = (e: any) => {
    e.preventDefault();
    history.push('/home/permission');
  }

  return (
    <div className="qr-container" onClick={e => openPermissionPage(e)}>
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

