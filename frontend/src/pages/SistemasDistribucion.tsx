import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';

const SistemasDistribucion: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <button className="btn-contact-nav" onClick={() => history.goBack()} style={{ marginBottom: 20 }}>← Volver</button>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1>Sistemas de distribución</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Para aprovechar bombas de calor y otras fuentes térmicas, la elección del sistema de distribución es clave. A continuación, describimos las soluciones más habituales.
          </p>

          <IonGrid>
            <IonRow>
              <IonCol sizeXs="12" sizeMd="4">
                <h3>Suelo Radiante</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Red de tuberías bajo el pavimento que distribuye calor o frío de forma uniforme. Es el sistema más eficiente al trabajar a baja temperatura.
                </p>
              </IonCol>

              <IonCol sizeXs="12" sizeMd="4">
                <h3>Fancoils</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Unidades que impulsan aire sobre un intercambiador para calentar o enfriar. Ofrecen respuesta rápida y control por estancia.
                </p>
              </IonCol>

              <IonCol sizeXs="12" sizeMd="4">
                <h3>Radiadores de baja temperatura</h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Radiadores con mayor superficie que permiten calefacción con agua a menor temperatura, optimizando bombas de calor.
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SistemasDistribucion;
