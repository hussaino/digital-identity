import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonButton } from '@ionic/react';
import './PermissionComponent.css';


const PermissionComponent: React.FC = () => {
  //const [url, setURL] = useState("http://facebook.github.io/react/");

  return (
    <div className="permission-container">
      <IonCard className="card-bg">
        <IonCardHeader>
          <IonCardTitle>مكتب النخلة يطلب السماح منك للحصول على المعلومات التالية:</IonCardTitle>
        </IonCardHeader>

        <IonItem>
          <IonLabel>الاسم الكامل</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>العمر</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>الحالة الاجتماعية</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>المسمى الوظيفي</IonLabel>
        </IonItem>

        <IonItem className="card-buttons" >
          <IonButton expand="block" size="default" >السماح</IonButton>
          <IonButton expand="block" size="default" color="danger">عدم السماح</IonButton>
        </IonItem>
      </IonCard>


    </div>
  );


}

export default PermissionComponent;

