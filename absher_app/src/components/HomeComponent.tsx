import React from 'react';
import { useHistory } from 'react-router-dom'
import './HomeComponent.css';

const Component: React.FC = () => {

  const history = useHistory();

  const openQRPage = (e: any) => {
    e.preventDefault();
    history.push('/home/qr');
  }


  return (
    <div className="home-container">
      <img src="assets/image/absher-home.jpeg" alt="absher-home" height="800" onClick={e => openQRPage(e)}></img>
    </div>
  );
};

export default Component;
