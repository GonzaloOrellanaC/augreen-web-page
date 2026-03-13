import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';

const Geotermia: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <button className="btn-contact-nav" onClick={() => history.goBack()} style={{ marginBottom: 20 }}>← Volver</button>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1>Geotermia</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            La geotermia aprovecha el calor del subsuelo mediante intercambiadores y bombas de calor. Es una fuente renovable y disponible de forma constante, indicada para calefacción, refrigeración y agua caliente sanitaria.
          </p>

          <img src="/images/geotermia/geotermia.png" alt="Geotermia" style={{ width: '100%', borderRadius: 8, margin: '18px 0' }} />

          <IonGrid>
            <IonRow>
              <IonCol sizeXs="12" sizeMd="4">
                <h3>Captación Vertical</h3>
                <img src="/images/geotermia/captacion_vertical.png" alt="Captación vertical" style={{ width: '100%', borderRadius: 8 }} />
                <p style={{ color: 'var(--text-muted)' }}>
                  Perforaciones profundas con sondas geotérmicas en circuito cerrado. Ocupa poco espacio en superficie y ofrece rendimiento estable todo el año.
                </p>
              </IonCol>

              <IonCol sizeXs="12" sizeMd="4">
                <h3>Captación Horizontal</h3>
                <img src="/images/geotermia/captacion_horizontal.png" alt="Captación horizontal" style={{ width: '100%', borderRadius: 8 }} />
                <p style={{ color: 'var(--text-muted)' }}>
                  Tuberías enterradas a poca profundidad que intercambian calor con el terreno superficial. Requiere mayor área, ideal en terrenos amplios y poco profundos.
                </p>
              </IonCol>

              <IonCol sizeXs="12" sizeMd="4">
                <h3>Captación Freática</h3>
                <img src="/images/geotermia/captacion_freatica.png" alt="Captación freática" style={{ width: '100%', borderRadius: 8 }} />
                <p style={{ color: 'var(--text-muted)' }}>
                  Utiliza directamente aguas subterráneas como fluido transferidor en circuito abierto. Alto rendimiento cuando existen acuíferos adecuados.
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>

          <section style={{ marginTop: 20 }}>
            <h3>Ventajas</h3>
            <ul style={{ color: 'var(--text-muted)' }}>
              <li>Alta eficiencia térmica y estabilidad estacional.</li>
              <li>Reducción significativa de emisiones y costos operativos.</li>
              <li>Compatibilidad con suelo radiante y sistemas de baja temperatura.</li>
            </ul>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Geotermia;
