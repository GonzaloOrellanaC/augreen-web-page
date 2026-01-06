import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { useHistory } from 'react-router';

type ServiceProps = {
  title: string;
  intro: string;
  bullets: string[];
  image?: string;
};

const ServiceTemplate: React.FC<ServiceProps> = ({ title, intro, bullets, image }) => {
    const history = useHistory()
    // derive image path from provided `image` prop or from `title`
    const slugify = (s: string) => s
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const brochureFileName = image ? image : `${slugify(title)}.jpg`;
    // images placed in the public `images` folder are served from `/images/...`
    const brochureSrc = `/images/${brochureFileName}`;
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <section className="service-page">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <button className="btn-contact-nav" onClick={() => history.goBack()} style={{ marginBottom: 30, background: 'transparent', color: '#0F172A', border: '1px solid rgba(0,0,0,0.06)' }}>
              ← Volver
            </button>

            <IonGrid>
              <IonRow>
                <IonCol sizeXs='12' sizeMd='4'>
                  <div style={{padding: 10}}>
                    <h1 style={{ fontSize: 40, marginBottom: 12 }}>{title}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.6 }}>{intro}</p>

                    <div style={{ marginTop: 30 }}>
                    {bullets.map((b, i) => (
                        <div key={i} style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--brand-green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowRight size={18} />
                        </div>
                        <div style={{ color: 'var(--text-muted)' }}>{b}</div>
                        </div>
                    ))}
                    </div>
                  </div>
                </IonCol>
                <IonCol sizeXs='12' sizeMd='4'>
                  <div style={{ padding: 10 }}>
                    <img src={brochureSrc} alt={`${title} brochure`} style={{ width: '100%', borderRadius: 8, boxShadow: '0 6px 18px rgba(15,23,42,0.08)', objectFit: 'cover' }} />
                  </div>
                </IonCol>
                <IonCol sizeXs='12' sizeMd='4'>
                  <div className="card-premium">
                    <h3 style={{ marginTop: 0 }}>{title} — Cotiza tu proyecto</h3>
                    <p>Completa el formulario y uno de nuestros ingenieros se contactará contigo para evaluar tu caso.</p>
                    <button className="btn-contact-nav" style={{ marginTop: 20, width: '100%' }}>SOLICITAR COTIZACIÓN</button>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export const PanelesSolares: React.FC = () => (
  <ServiceTemplate
    title="Paneles Solares"
    intro="Diseñamos e instalamos sistemas fotovoltaicos para viviendas y empresas, optimizando el rendimiento y la integración con la red o soluciones de almacenamiento."
    bullets={[
      'Análisis de sitio y orientación solar',
      'Dimensionamiento y simulaciones de producción',
      'Equipos de alta eficiencia y garantías extendidas',
      'Monitoreo y mantenimiento programado'
    ]}
    image='BROCHURE-SOLAR.png'
  />
);

export const ClimatizacionInverter: React.FC = () => (
  <ServiceTemplate
    title="Climatización Inverter"
    intro="Soluciones inverter para climatizar espacios con eficiencia energética, control de zonas y bajo consumo."
    bullets={[
      'Sistemas multi-split y VRF según escala',
      'Controles inteligentes y programación',
      'Instalación con criterios acústicos y estéticos',
      'Servicio postventa y optimización de consumo'
    ]}
    image='BROCHURE-CLIMATIZACION.png'
  />
);

export const BombasDeCalor: React.FC = () => (
  <ServiceTemplate
    title="Bombas de Calor"
    intro="Implementamos bombas de calor aire-agua y geotérmicas para calefacción y agua caliente sanitaria con alta eficiencia."
    bullets={[
      'Evaluación térmica del edificio',
      'Integración con sistemas existentes',
      'Sistemas híbridos con paneles solares',
      'Mantenimiento y optimización energética'
    ]}
    image='BROCHURE-BOMBAS-CALOR.png'
  />
);

export const ServicioTecnico: React.FC = () => (
  <ServiceTemplate
    title="Servicio Técnico"
    intro="Soporte técnico especializado para mantener tus sistemas operando al máximo rendimiento y con el menor tiempo de inactividad."
    bullets={[
      'Planes de mantención preventiva',
      'Repuestos y diagnóstico profesional',
      'Soporte remoto y visitas técnicas',
      'Contratos de servicio adaptados a tu operación'
    ]}
    image='BROCHURE-SERVICIO-TECNICO.png'
  />
);

export default ServiceTemplate;
