import React, { useContext } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import './CustomerDetailsComponent.css';
import { AppContext } from './../AppContext';


const CustomerDetailsComponent: React.FC = () => {
  const myContext: any = useContext(AppContext);
  console.log("CustomerDetailsComponent - myContext:", myContext);
  const customerInfo = myContext.customerInfo;

  const initDOM = () => {
    var customerInfoArray: any = [];

    const createIonItem = (elementKey: string, label: string, content: string) => {
      var labelElement = React.createElement('h2', {}, label);
      var contentElement = React.createElement('p', {}, content);
      var ionLabel = React.createElement(IonLabel, { key: elementKey }, [labelElement, contentElement]);
      var ionItem = React.createElement(IonItem, { key: elementKey }, ionLabel);
      return ionItem;
    }

    if (customerInfo.hasOwnProperty("name")) {
      var label = "الاسم الكامل";
      var content = "فيصل مرزوق المري";
      customerInfoArray.push(createIonItem("name", label, content));
    }

    if (customerInfo.hasOwnProperty("age")) {
      var label = "العمر";
      var content = "23";
      customerInfoArray.push(createIonItem("age", label, content));
    }

    if (customerInfo.hasOwnProperty("marital")) {
      var label = "الحالية الاجتماعية";
      var content = "متزوج";
      customerInfoArray.push(createIonItem("marital", label, content));
    }

    if (customerInfo.hasOwnProperty("job")) {
      var label = "المسمى الوظيفي";
      var content = "مدخل بيانات";
      customerInfoArray.push(createIonItem("job", label, content));
    }
    return React.createElement('div', {}, customerInfoArray);
  }

  return (
    <div className="customer-details-container">
      <IonCard className="card-bg">
        <IonCardHeader>
          <IonCardTitle>
            <h2><b>معلومات العميل</b></h2>
          </IonCardTitle>
        </IonCardHeader>

        {initDOM()}

      </IonCard>

    </div>
  );
}

export default CustomerDetailsComponent;

