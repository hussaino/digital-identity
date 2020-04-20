import React from 'react';
import { useHistory } from 'react-router-dom'
import './HomeComponent.css';

const Component: React.FC = () => {

  const history = useHistory();

  const openCustomerDetails = (e: any) => {
    e.preventDefault();
    history.push('/home/customer');
  }

  return (
    <div className="home-container">
      <img src="assets/image/absher-home.jpeg" height="800" onClick={e => openCustomerDetails(e)}></img>
    </div>
  );
};

export default Component;
