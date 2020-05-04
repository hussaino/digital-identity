import { IonContent, IonPage, IonList } from '@ionic/react';
import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import CartItem from '../components/CartItem';
import './HomePage.css';

const Home: React.FC = () => {
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
