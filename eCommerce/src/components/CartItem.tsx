import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import './CartItem.css';

interface CartItemProps {
  name: string;
  price: string;
  description: string;
  image: string;
}


const Component: React.FC<CartItemProps> = ({ name, price, description, image }) => {
  return (
    <IonItem lines="none" >
      <div>
        <img className="item-image" src={"assets/image/" + image} alt="product" />
      </div>
      <IonLabel>
        <h2 className="item-title">{name}</h2>
        <p className="item-price">{price + "SR"}</p>
        <p>{description}</p>
      </IonLabel>
    </IonItem >
  );
};

export default Component;
