import React from 'react';
import {useHistory} from 'react-router-dom'

const Component: React.FC = () => {

  const history = useHistory();
  
  const openQRPage = (e:any)  => { 
    e.preventDefault();
    history.push('/home/qr');
  }

  
  return (
    <div className="container">
      <img src="assets/absher-home.jpeg" onClick={e => openQRPage(e)}></img>
    </div>
  );
};

export default Component;
