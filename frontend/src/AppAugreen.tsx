import React, { useState, useEffect } from 'react';
import { 
  Sun, Zap, Thermometer, Settings, Play, Send, X, MessageCircle, 
  CheckCircle2, ShieldCheck, Award, MapPin, Facebook, Instagram, Linkedin, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK IONIC COMPONENTS FOR PREVIEW ENVIRONMENT ---
const IonApp = ({ children }) => <div className="ion-app">{children}</div>;
const IonPage = ({ children }) => <div className="ion-page">{children}</div>;
const IonHeader = ({ children, className }) => <header className={`ion-header ${className}`}>{children}</header>;
const IonToolbar = ({ children, style }) => <div className="ion-toolbar" style={style}>{children}</div>;
const IonContent = ({ children, onScroll }) => (
  <main className="ion-content" onScroll={(e) => onScroll({ detail: { scrollTop: e.target.scrollTop } })}>
    {children}
  </main>
);
const IonGrid = ({ children }) => <div className="ion-grid">{children}</div>;
const IonRow = ({ children }) => <div className="ion-row">{children}</div>;
const IonCol = ({ children, sizeLg, sizeMd, sizeXs }) => <div className="ion-col">{children}</div>;
const IonFab = ({ children }) => <div className="ion-fab">{children}</div>;
const IonFabButton = ({ children, onClick, style }) => (
  <button className="ion-fab-button" onClick={onClick} style={style}>{children}</button>
);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleScroll = (ev) => {
    setScrolled(ev.detail.scrollTop > 60);
  };

  const services = [
    { id: 1, title: 'Energía Solar', icon: <Sun />, color: '#E7F21C', desc: 'Paneles fotovoltaicos de alta gama.' },
    { id: 2, title: 'Climatización HVAC', icon: <Zap />, color: '#12B21E', desc: 'Sistemas Inverter de alta eficiencia.' },
    { id: 3, title: 'Calefacción Central', icon: <Thermometer />, color: '#12B21E', desc: 'Bombas de calor sustentables.' },
    { id: 4, title: 'Mantención Pro', icon: <Settings />, color: '#4A5568', desc: 'Mantenimiento técnico certificado.' }
  ];

  return (
    <IonApp>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;700;900&display=swap');

        :root {
          --brand-au: #E7F21C;
          --brand-green: #12B21E;
          --text-main: #0F172A;
          --text-muted: #64748B;
          --font-logo: 'London Bridge Black', 'Archivo Black', sans-serif;
          --font-body: 'Inter', sans-serif;
        }

        body { 
          margin: 0; 
          font-family: var(--font-body); 
          background: #f8fafc; 
          color: var(--text-main);
          overflow-x: hidden;
        }

        .ion-app { display: flex; flex-direction: column; min-height: 100vh; }
        .ion-page { width: 100%; position: relative; }
        .ion-content { height: 100vh; overflow-y: auto; scroll-behavior: smooth; }

        h1, h2, h3, .logo-text, .hero-title, .nav-btn, .btn-contact-nav {
          font-family: var(--font-logo);
          text-transform: uppercase;
        }

        /* --- Header --- */
        .ion-header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.5s ease;
          padding: 25px 0;
        }

        .header-scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          padding: 10px 0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }

        .ion-toolbar {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 50px;
        }

        .nav-link-group { display: flex; gap: 35px; align-items: center; }
        .nav-btn {
          background: none;
          border: none;
          color: white;
          font-size: 11px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: 0.3s;
        }

        .header-scrolled .nav-btn { color: var(--text-main); }
        .header-scrolled .nav-btn:hover { color: var(--brand-green); }

        .btn-contact-nav {
          background: var(--brand-green);
          color: white;
          border: none;
          padding: 14px 30px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(18, 178, 30, 0.2);
          transition: 0.3s;
        }

        .btn-contact-nav:hover { transform: translateY(-3px); background: #0e9418; }

        /* --- Logo --- */
        .logo-wrapper { display: flex; align-items: center; gap: 15px; }
        .logo-icon {
          background: var(--brand-green);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-au);
          font-family: var(--font-logo);
          font-size: 18px;
        }
        .logo-content { display: flex; flex-direction: column; line-height: 1; }
        .logo-text { margin: 0; font-size: 26px; letter-spacing: -1px; }
        .logo-text-au { color: var(--brand-au); }
        .logo-text-green { color: white; transition: color 0.3s; }
        .header-scrolled .logo-text-green { color: var(--brand-green); }
        .logo-tagline {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 2px;
          margin-top: 4px;
          color: var(--brand-green);
        }

        /* --- Hero --- */
        .hero-container {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #000;
        }
        .hero-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          animation: slowZoom 30s infinite alternate linear;
        }
        @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
          z-index: 1;
        }
        .hero-content { position: relative; z-index: 2; padding: 0 50px; width: 100%; max-width: 1400px; margin: 0 auto; }
        .hero-title { font-size: clamp(3rem, 8vw, 7rem); color: white; line-height: 0.9; margin-bottom: 2rem; }
        .hero-title span { color: var(--brand-au); display: block; }
        .hero-p { color: rgba(255,255,255,0.8); font-size: 18px; max-width: 600px; line-height: 1.6; margin-bottom: 40px; }

        /* --- Grid --- */
        .section-padding { padding: 120px 50px; }
        .ion-grid { max-width: 1400px; margin: 0 auto; }
        .ion-row { display: flex; flex-wrap: wrap; gap: 30px; }
        .ion-col { flex: 1; min-width: 300px; }

        /* --- Cards --- */
        .card-premium {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          transition: 0.4s ease;
          border: 1px solid rgba(0,0,0,0.02);
        }
        .card-premium:hover { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(18, 178, 30, 0.1); }
        .icon-box { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 25px; }
        .card-premium h3 { font-size: 20px; margin-bottom: 15px; }
        .card-premium p { color: var(--text-muted); line-height: 1.6; font-size: 15px; }

        /* --- Fab --- */
        .ion-fab { position: fixed; bottom: 40px; right: 40px; z-index: 1100; }
        .ion-fab-button {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 15px 30px rgba(18, 178, 30, 0.3);
          transition: 0.3s;
        }
        .ion-fab-button:hover { transform: scale(1.1); }

        @media (max-width: 768px) {
          .ion-toolbar { padding: 0 20px; }
          .hero-content { padding: 0 20px; }
          .nav-link-group { display: none; }
          .section-padding { padding: 80px 20px; }
        }
      `}</style>

      <IonPage>
        <IonHeader className={scrolled ? 'header-scrolled' : ''}>
          <IonToolbar style={{ '--background': 'transparent', '--border-style': 'none' }}>
            <div className="ion-toolbar">
              <div className="logo-wrapper">
                <div className="logo-icon">AU</div>
                <div className="logo-content">
                  <h2 className="logo-text">
                    <span className="logo-text-au">Au</span>
                    <span className="logo-text-green" style={{ color: scrolled ? '#12B21E' : 'white' }}>Green</span>
                  </h2>
                  <span className="logo-tagline">Eficiencia Energética</span>
                </div>
              </div>
              <div className="nav-link-group">
                <button className="nav-btn">Inicio</button>
                <button className="nav-btn">Servicios</button>
                <button className="btn-contact-nav">Cotizar Proyecto</button>
              </div>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent scrollEvents={true} onIonScroll={handleScroll}>
          {/* Hero Section */}
          <section className="hero-container">
            <div className="hero-gradient"></div>
            <img src="https://images.unsplash.com/photo-1509391366360-feaffa603201?auto=format&fit=crop&q=80&w=2000" className="hero-bg-image" alt="AuGreen Banner" />
            <div className="hero-content">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <h1 className="hero-title">Energía <span>Sustentable.</span></h1>
                <p className="hero-p">Ingeniería de vanguardia en climatización y paneles solares para hogares y empresas en todo Chile.</p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <button className="btn-contact-nav" style={{ padding: '20px 45px', fontSize: '14px' }}>Iniciar Proyecto</button>
                  <button className="nav-btn" style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>Ver Trabajos <Play size={20} /></button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Services Section */}
          <section className="section-padding">
            <IonGrid>
              <IonRow>
                {services.map(s => (
                  <IonCol key={s.id}>
                    <div className="card-premium">
                      <div className="icon-box" style={{ background: `${s.color}15`, color: s.color === '#E7F21C' ? '#b5be14' : s.color }}>
                        {React.cloneElement(s.icon, { size: 30 })}
                      </div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                      <div style={{ color: '#12B21E', fontWeight: '900', marginTop: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        DETALLES TÉCNICOS <ArrowRight size={16} />
                      </div>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </section>
        </IonContent>

        <IonFab>
          <IonFabButton onClick={() => setChatOpen(!chatOpen)} style={{ backgroundColor: '#12B21E' }}>
            {chatOpen ? <X size={28} color="#E7F21C" /> : <MessageCircle size={28} color="#E7F21C" />}
          </IonFabButton>
        </IonFab>
      </IonPage>
    </IonApp>
  );
};

export default App;