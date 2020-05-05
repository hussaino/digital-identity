import { IonContent, IonPage, IonList, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import CartItem from '../components/CartItem';
import './HomePage.css';

const Home: React.FC = () => {
  const history = useHistory();

  const onCheckoutClick = () => {
    history.push('/shipping');
  }

  return (
    <IonPage>
      <HeaderComponent />
      <IonContent>
        <div className="cart-title">Cart</div>
        <IonList className="cart-list">
          <CartItem
            name="Cotton Round Neck Tshirt"
            price="120"
            description="Great product for anyone looking for white t-shirt"
            image="T-shirt.png"
          />
          <CartItem
            name="Sport Shoes"
            price="400"
            description="Great product for anyone looking for sport shoes"
            image="shoes.png"
          />
        </IonList>
        <div className="cart-checkout">
          <p className="total-price">Total: 520SR</p>
          <IonButton color={'primary'} onClick={() => onCheckoutClick()}>Checkout</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
