import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';

const Aerotermia: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <button className="btn-contact-nav" onClick={() => history.goBack()} style={{ marginBottom: 20 }}>← Volver</button>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1>Aerotermia</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            La aerotermia es una tecnología que extrae energía del aire exterior para generar calefacción, refrigeración y agua caliente sanitaria. Es altamente eficiente y se integra fácilmente en bombas de calor aire-agua o aire-aire.
          </p>

          <img src="/images/geotermia/arotermia.png" alt="Aerotermia" style={{ width: '100%', borderRadius: 8, margin: '18px 0' }} />

          <IonGrid>
            <IonRow>
              <IonCol>
                <h3>Beneficios</h3>
                <ul style={{ color: 'var(--text-muted)' }}>
                  <li>Alta eficiencia con COP elevados en gran parte del año.</li>
                  <li>Instalación menos invasiva que sistemas geotérmicos.</li>
                  <li>Ideal para rehabilitación energética y soluciones residenciales.</li>
                </ul>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Aerotermia;
