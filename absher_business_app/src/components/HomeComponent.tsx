import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { IonLoading, IonContent } from '@ionic/react';
import './HomeComponent.css';

const Component: React.FC = () => {

  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);

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
      <div className="home-container">
        <img src="assets/image/absher-home.jpeg" height="800" onClick={e => setShowLoading(true)}></img>
      </div>
    </IonContent>
  );
};

export default Component;
