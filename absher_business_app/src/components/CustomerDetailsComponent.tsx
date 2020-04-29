import React, { useContext } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import './CustomerDetailsComponent.css';
import { AppContext } from './../AppContext';


const CustomerDetailsComponent: React.FC = () => {
  const myContext: any = useContext(AppContext);
  console.log("CustomerDetailsComponent - myContext:", myContext);


  return (
    <div className="customer-details-container">
      <IonCard className="card-bg">
        <IonCardHeader>
          <IonCardTitle>
            <h2><b>معلومات العميل</b></h2>
          </IonCardTitle>
        </IonCardHeader>

        <IonItem>
          <IonLabel>
            <h2>الاسم الكامل</h2>
            <p>فيصل مرزوق المري</p>
          </IonLabel>

        </IonItem>

        <IonItem>
          <IonLabel>
            <h2>العمر</h2>
            <p>23</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2>الحالة الاجتماعية</h2>
            <p>متزوج</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2>المسمى الوظيفي</h2>
            <p>مدخل بيانات</p>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h2>الصورة الشخصية</h2>
          </IonLabel>
        </IonItem>
      </IonCard>

    </div>
  );


}

export default CustomerDetailsComponent;

