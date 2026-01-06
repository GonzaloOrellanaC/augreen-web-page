import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, Settings, Sun, Thermometer, Zap } from 'lucide-react';
import ServiceContactForm from '../components/ServiceContactForm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { chatboxOutline, closeOutline, logoFacebook, logoInstagram, logoLinkedin } from 'ionicons/icons';

const Home: React.FC = () => {

  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // navigation
  const history = useHistory();

  


const SVGAuGreenLogoFabIconString = (size = 40) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="AG logo">
      <title>AG</title>
      <rect width="100" height="100" rx="20" fill="transparent" />
      <text x="30" y="62" font-family="'London Bridge Black', 'Archivo Black', sans-serif" font-weight="900" font-size="48">
        <tspan fill="#E7F21C">A</tspan>
        <tspan x="58" fill="#12B21E">G</tspan>
      </text>
    </svg>
  `;
}

  const handleScroll = (ev: any) => {
    const top = ev && ev.detail ? ev.detail.scrollTop : 0;
    setScrolled(top > 60);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const openService = (slug: string) => {
    history.push(`/servicios/${slug}`);
    const el = document.querySelector('.ion-content');
    if (el) (el as HTMLElement).scrollTop = 0;
  };

  // inject fab SVG when chat is closed
  useEffect(() => {
    const el = document.getElementById('fabIcon');
    if (el) {
      el.innerHTML = SVGAuGreenLogoFabIconString(36);
    }
  }, []);

  const services = [
    { id: 1, slug: 'paneles', title: 'Paneles Solares', icon: <Sun size={30} />, color: '#E7F21C', desc: 'Paneles fotovoltaicos de alta gama.' },
    { id: 2, slug: 'climatizacion', title: 'Climatización Inverter', icon: <Zap size={30} />, color: '#12B21E', desc: 'Sistemas Inverter de alta eficiencia.' },
    { id: 3, slug: 'bombas', title: 'Bombas de Calor', icon: <Thermometer size={30} />, color: '#12B21E', desc: 'Bombas de calor sustentables.' },
    { id: 4, slug: 'tecnico', title: 'Servicio Técnico', icon: <Settings size={30} />, color: '#4A5568', desc: 'Mantenimiento técnico certificado.' }
  ];
  
  const SVGAuGreenLogo = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="90" viewBox="0 0 200 90" role="img" aria-labelledby="title desc" className="inline-logo">
        <title id="title">AuGreen logo</title>
        <desc id="desc">AU badge in yellow and wordmark Green in accent color with tagline</desc>
        <defs>
          <style>{`
            .logo-text-au { fill: #E7F21C; font-family: 'London Bridge Black', 'Archivo Black', sans-serif; font-size:40px; font-weight:400; }
            .badge-text { fill: #071021; font-family: 'London Bridge Black', 'Archivo Black', sans-serif; font-weight:900; font-size:22px; }
            .logo-text-green { fill: #12B21E; font-family: 'London Bridge Black', 'Archivo Black', sans-serif; font-size:40px; font-weight:400; }
            .tagline { fill: #12B21E; font-family: 'London Bridge Black', system-ui, Arial, sans-serif; font-size:12.5px; letter-spacing:1.2px; }
          `}</style>
        </defs>
  
        {/* AU badge */}
        <text x="5" y="50" className="logo-text-au">Au</text>
  
        {/* Wordmark */}
        <text x="63" y="50" className="logo-text-green">Green</text>
  
        {/* Tagline */}
        <text x="5" y="68" className="tagline">EFICIENCIA ENERGÉTICA</text>
      </svg>
    );
  }
  
  const SVGAuGreenLogoFabIcon = ({ size = 40 }: { size?: number }) => {
    // Minimal 'AG' logo intended for use as a FAB icon.
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="AG logo"
        className="fab-ag-icon"
      >
        <title>AG</title>
        <rect width="100" height="100" rx="20" fill="transparent" />
        <text x="30" y="62" fontFamily="'London Bridge Black', 'Archivo Black', sans-serif" fontWeight="900" fontSize="48">
          <tspan fill="#E7F21C">A</tspan>
          <tspan x="58" fill="#12B21E">G</tspan>
        </text>
      </svg>
    );
  }
  

  return (
    <>
    {/* Side menu for mobile */}
        <IonMenu side="end" contentId="main-content" type="overlay" style={{zIndex: 1000}}>
          <IonContent className="side-menu">
              <IonList>
                <IonMenuToggle autoHide={false}>
                  <IonItem button lines="none" className="menu-item">Inicio</IonItem>
                  <IonItem button lines="none" className="menu-item">Servicios</IonItem>
                  <IonItem button lines="none" className="menu-item">Cotizar Proyecto</IonItem>
                </IonMenuToggle>
              </IonList>
          </IonContent>
        </IonMenu>
        <IonPage id="main-content">
          <IonHeader style={{backgroundColor: 'transparent'}} className={'header-scrolled'}>
            <IonToolbar className="toolbar-inner" style={{ '--background': 'transparent', padding: '0 20px' } as React.CSSProperties}>
              <div className="logo-wrapper" style={{backgroundColor: 'transparent'}}>
                <SVGAuGreenLogo />
              </div>

              <IonButtons slot="end" className="header-actions">
                <div className="nav-link-group desktop-only">
                  <IonButton fill="clear" className="nav-btn" onClick={() => { scrollToId('main-content'); }}>Inicio</IonButton>
                  <IonButton className="btn-contact-nav">Cotizar Proyecto</IonButton>
                </div>

                {/* Menu button for mobile */}
                <IonMenuButton className="menu-btn" autoHide={false} />
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent  scrollEvents={true} onIonScroll={handleScroll}>

            /* when no service selected render the main site content */

            /* Hero as Swiper carousel (uses images from public/images) */
            <>
            <section className="hero-container swiper-hero">
              <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={2000}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                className="main-swiper"
              >
                {/* Slide 0 */}
                <SwiperSlide>
                  <div className="slide-inner">
                    <img className="slide-image" src="/images/aire-acondicionado-casa.png" alt="aire-acondicionado-casa" style={{objectPosition: '70% 35%'}} />
                    <div className="slide-overlay">
                      <div className="slide-copy first">
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={activeIndex === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 2.5, ease: 'easeOut' }}
                          className="hero-title"
                        >
                          Climatización Residencial
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, y: 18 }}
                          animate={activeIndex === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                          transition={{ duration: 2.5, delay: 0.15, ease: 'easeOut' }}
                          className="slide-desc hero-p"
                        >
                          Confort y eficiencia energética para tu hogar, con sistemas silenciosos y optimizados.
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 1 */}
                <SwiperSlide>
                  <div className="slide-inner">
                    <img className="slide-image" src="/images/calefaccion-restaurant.png" alt="calefaccion-restaurant" style={{objectPosition: '50% 45%'}} />
                    <div className="slide-overlay">
                      <div className="slide-copy second">
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={activeIndex === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 2.5, ease: 'easeOut' }}
                          className="hero-title"
                        >
                          Calefacción Comercial
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, y: 18 }}
                          animate={activeIndex === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                          transition={{ duration: 2.5, delay: 0.15, ease: 'easeOut' }}
                          className="slide-desc hero-p"
                        >
                          Soluciones robustas para restaurantes y espacios de alta demanda térmica.
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                  <div className="slide-inner">
                    <img className="slide-image" src="/images/calefaccion-termo-solar.png" alt="calefaccion-termo-solar" style={{objectPosition: '30% 45%'}}/>
                    <div className="slide-overlay third">
                      <div className="slide-copy">
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={activeIndex === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 2.5, ease: 'easeOut' }}
                          className="hero-title"
                        >
                          Energía Termosolar Integrada
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, y: 18 }}
                          animate={activeIndex === 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                          transition={{ duration: 2.5, delay: 0.15, ease: 'easeOut' }}
                          className="slide-desc hero-p"
                        >
                          Soluciones térmicas solares para agua caliente y calefacción con alta eficiencia.
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </section>

            <section className="section-padding" id="servicios">
              <IonGrid>
                <IonRow>
                  {services.map(s => (
                    <IonCol key={s.id} className="service-col" onClick={() => openService(s.slug)} style={{ cursor: 'pointer' }}>
                      <div className="card-premium">
                        <div className="icon-box" style={{ background: `${s.color}15`, color: s.color }}>
                          {s.icon}
                        </div>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <div className="card-cta">DETALLES TÉCNICOS <ArrowRight size={14} /></div>
                      </div>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </section>

            {/* Stats (below hero) */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">4.5k+</div>
                <div className="stat-label">INSTALACIONES LISTAS</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">65%</div>
                <div className="stat-label">AHORRO PROMEDIO</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24H</div>
                <div className="stat-label">TIEMPO DE RESPUESTA</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">18+</div>
                <div className="stat-label">AÑOS LÍDERES</div>
              </div>
            </div>

            {/* About */}
            <section className="about" id="nosotros">
              <div className="about-image">
                <img src="./images/tecnicos-certificados.png" alt="Técnicos Certificados AuGreen" />
                <div className="about-badge">
                  <h3>15+</h3>
                  <p>CERTIFICACIONES<br/>INTERNACIONALES</p>
                </div>
              </div>
              <div className="about-text">
                <span className="section-tag">NUESTRA EXPERIENCIA</span>
                <h2>INGENIERÍA DE PRECISIÓN EN CADA DETALLE.</h2>
                <p>En <strong>AuGreen</strong>, entendemos que la eficiencia no es una opción, sino una necesidad. Con más de una década en el mercado chileno, transformamos espacios a través de tecnología climática de vanguardia.</p>
                <p>Nuestro equipo de ingenieros y técnicos certificados garantiza que cada watt de energía sea optimizado al máximo, reduciendo costos operativos y huella de carbono.</p>
                <button className="btn-contact-nav" style={{ background: 'var(--text-main)' }}>DESCARGAR BROCHURE</button>
              </div>
            </section>

            {/* Gallery */}
            <section className="gallery" id="galeria">
              <div className="section-header">
                <span className="section-tag">CASOS DE ÉXITO</span>
                <h2 style={{ fontSize: 40 }}>TRABAJOS CERTIFICADOS</h2>
              </div>
              <div className="gallery-grid">
                <div className="gallery-item big">
                  <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200" alt="Instalación Industrial AuGreen" />
                  <div className="gallery-caption">
                    <p>PLANTA INDUSTRIAL / SANTIAGO</p>
                    <h4>SISTEMA SOLAR 50KW</h4>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800" alt="Climatización Corporativa" />
                  <div className="gallery-caption">
                    <p>OFICINAS PREMIUM / LAS CONDES</p>
                    <h4>CLIMATIZACIÓN MULTI-ZONE</h4>
                  </div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800" alt="Calefacción Residencial" />
                  <div className="gallery-caption">
                    <p>RESIDENCIAL / VITACURA</p>
                    <h4>BOMBA DE CALOR AIRE-AGUA</h4>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="faq">
              <div className="faq-container">
                <div className="section-header" style={{ textAlign: 'center' }}>
                  <span className="section-tag">CONSULTAS</span>
                  <h2 style={{ fontSize: 42 }}>PREGUNTAS FRECUENTES</h2>
                </div>
                <div style={{ marginTop: 50 }}>
                  {[
                    '¿Qué garantía tienen las instalaciones?',
                    '¿Realizan visitas de factibilidad técnica sin costo?',
                    '¿Cuánto tiempo toma la instalación de paneles solares?'
                  ].map((q, idx) => (
                    <div key={idx} className={`faq-item ${faqOpen === idx ? 'active' : ''}`}>
                      <div className="faq-question" onClick={() => toggleFaq(idx)}>
                        {q} <span style={{ marginLeft: 10 }}>{faqOpen === idx ? '−' : '+'}</span>
                      </div>
                      <div className="faq-answer">
                        {idx === 0 && 'Todas nuestras instalaciones cuentan con una garantía técnica de 2 años y garantía de fabricante de hasta 10 años en equipos específicos.'}
                        {idx === 1 && 'Sí, realizamos visitas técnicas en la Región Metropolitana para evaluar la viabilidad de proyectos fotovoltaicos y climáticos.'}
                        {idx === 2 && 'Un sistema residencial estándar toma entre 2 y 4 días hábiles, incluyendo la puesta en marcha y configuración del monitoreo.'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="contact" id="contacto">
              <div className="contact-grid">
                <div className="contact-info">
                  <span className="section-tag" style={{ color: 'var(--brand-yellow)' }}>HABLEMOS</span>
                  <h2>¿LISTO PARA EL FUTURO?</h2>
                  <p>Déjanos tus datos y un ingeniero especialista se contactará contigo en menos de 24 horas hábiles.</p>
                  <div className="contact-item"><div className="icon"><Phone size={20} /></div>
                    <div><h5>TELÉFONO DE VENTAS</h5><div>+56 9 8765 4321</div></div>
                  </div>
                  <div className="contact-item"><div className="icon"><Mail size={20} /></div>
                    <div><h5>CORREO ELECTRÓNICO</h5><div>contacto@augreen.cl</div></div>
                  </div>
                  <div className="contact-item"><div className="icon"><MapPin size={20} /></div>
                    <div><h5>CASA MATRIZ</h5><div>Providencia 1234, Santiago, Chile</div></div>
                  </div>
                </div>

                <div className="contact-form">
                  <h3 style={{ marginBottom: 40, fontSize: 28 }}>SOLICITAR PRESUPUESTO</h3>
                  <form id="quote-form" onSubmit={(e) => { e.preventDefault(); alert('Solicitud enviada (simulado)'); }}>
                    <div className="form-group">
                      <label>Nombre Completo</label>
                      <input type="text" placeholder="Ej. Juan Pérez" />
                    </div>
                    <div className="form-group">
                      <label>Correo Electrónico</label>
                      <input type="email" placeholder="ejemplo@correo.com" />
                    </div>
                    <div className="form-group">
                      <label>Servicio de Interés</label>
                      <select>
                        <option>Energía Solar Fotovoltaica</option>
                        <option>Climatización / Aire Acondicionado</option>
                        <option>Calefacción Sustentable</option>
                        <option>Mantención Técnica</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Mensaje / Detalle del Proyecto</label>
                      <textarea rows={4} placeholder="Cuéntanos sobre tu necesidad..." />
                    </div>
                    <button type="submit" className="btn-contact-nav" style={{ width: '100%', padding: '22px', fontSize: 14 }}>ENVIAR SOLICITUD</button>
                  </form>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer>
              <div className="footer-grid">
                <div className="footer-col">
                  <a href="#" className="logo" style={{ marginBottom: 30 }}>
                    <div className="logo-content"><div className="logo-text" style={{ color: 'white' }}><span>Au</span>Green</div></div>
                  </a>
                  <p style={{ fontSize: 14 }}>Ingeniería experta en climatización y energía renovable. Elevamos el estándar de confort térmico en todo Chile.</p>
                  <div className="social-links">
                    <a href="#" className="social-btn" aria-label="Facebook"><IonIcon icon={logoFacebook} /></a>
                    <a href="#" className="social-btn" aria-label="Instagram"><IonIcon icon={logoInstagram} /></a>
                    <a href="#" className="social-btn" aria-label="LinkedIn"><IonIcon icon={logoLinkedin} /></a>
                  </div>
                </div>
                <div className="footer-col">
                  <h4>SERVICIOS</h4>
                  <ul className="footer-links">
                    <li><a href="#">Paneles Solares</a></li>
                    <li><a href="#">Climatización Inverter</a></li>
                    <li><a href="#">Bombas de Calor</a></li>
                    <li><a href="#">Servicio Técnico</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>COMPAÑÍA</h4>
                  <ul className="footer-links">
                    <li><a href="#">Sobre Nosotros</a></li>
                    <li><a href="#">Casos de Éxito</a></li>
                    <li><a href="#">Blog de Energía</a></li>
                    <li><a href="#">Trabaja con Nosotros</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>SOPORTE</h4>
                  <ul className="footer-links">
                    <li><a href="#">Preguntas Frecuentes</a></li>
                    <li><a href="#">Términos de Servicio</a></li>
                    <li><a href="#">Política de Privacidad</a></li>
                    <li><a href="#">Contacto Directo</a></li>
                  </ul>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 40, fontSize: 12, letterSpacing: 1, fontFamily: 'var(--font-logo)' }}>
                © 2026 AUGREEN CHILE • EFICIENCIA ENERGÉTICA • TODOS LOS DERECHOS RESERVADOS
              </div>
            </footer>

            </>

          </IonContent>

          <IonFab className="chat-fab" vertical="bottom" horizontal="end">
            <IonFabButton onClick={() => setChatOpen(!chatOpen)}>
              <IonIcon icon={chatOpen ? closeOutline : chatboxOutline} />
            </IonFabButton>
          </IonFab>

          <AnimatePresence>
            {chatOpen && (
              <ServiceContactForm onClose={() => setChatOpen(false)} />
            )}
          </AnimatePresence>
        </IonPage>
    </>
  );
};

export default Home;
