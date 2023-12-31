import React, { useContext } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'
import { authorizeAccess } from '../serverside'
import { AppContext } from './../AppContext';
import './PermissionComponent.css';


const PermissionComponent: React.FC = () => {
  const history = useHistory();
  const myContext: any = useContext(AppContext);
  console.log("PermissionComponent - myContext:", myContext);

  const businessData = myContext.businessData;
  const requestedInfo = myContext.requestedInfo;

  const initDOM = () => {
    var requestedInfoArray: any = [];

    const createIonItem = (elementKey: string, label: string) => {
      var ionLabel = React.createElement(IonLabel, { key: elementKey }, label);
      var ionItem = React.createElement(IonItem, { key: elementKey }, ionLabel);
      return ionItem;
    }

    for (var i = 0; i < requestedInfo.length; i++) {
      if (requestedInfo[i].indexOf('name') > -1) {
        requestedInfoArray.push(createIonItem("name", "الاسم الكامل"));
      }
      else if (requestedInfo[i].indexOf('age') > -1) {
        requestedInfoArray.push(createIonItem("age", "العمر"));
      }
      else if (requestedInfo[i].indexOf('marital') > -1) {
        requestedInfoArray.push(createIonItem("marital", "الحالية الاجتماعية"));
      }
      else if (requestedInfo[i].indexOf('job') > -1) {
        requestedInfoArray.push(createIonItem("job", "المسمى الوظيفي"));
      }
    }
    return React.createElement('div', {}, requestedInfoArray);
  }

  const handleAuthorizeResponse = () => {
    history.push('/home');
  }


  return (
    <div className="permission-container">
      <IonCard className="card-bg">
        <IonCardHeader>
          <IonCardTitle>مكتب النخلة يطلب السماح منك للحصول على المعلومات التالية:</IonCardTitle>
        </IonCardHeader>

        {initDOM()}

        <IonItem className="card-buttons" >
          <IonButton expand="block" size="default" onClick={e => authorizeAccess(businessData, true, handleAuthorizeResponse)}>السماح</IonButton>
          <IonButton expand="block" size="default" onClick={e => authorizeAccess(businessData, false, handleAuthorizeResponse)} color="danger">عدم السماح</IonButton>
        </IonItem>
      </IonCard>


    </div>
  );

}

export default PermissionComponent;