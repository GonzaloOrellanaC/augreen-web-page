import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play } from 'lucide-react';

type Props = {
  onClose: () => void;
  defaultService?: string;
};

const PHONE = '56981912157';
/* const PHONE = '56952210967'; */

const ServiceContactForm: React.FC<Props> = ({ onClose, defaultService }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(defaultService || 'Paneles Solares');
  const [message, setMessage] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = `Hola, quiero información sobre *${service}*.%0A%0ANombre: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0ADetalle: ${encodeURIComponent(message)}`;
    const url = `https://wa.me/${PHONE}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div className="chatbot-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
      <div className="chat-header">
        <div>Consulta de Servicios</div>
        <button className="chat-close" onClick={onClose}><X size={16} /></button>
      </div>

      <div className="chat-body" style={{ padding: 14 }}>
        <form id="service-contact-form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Servicio 📄</label>
            <select value={service} onChange={(e) => setService(e.target.value)} style={{ width: '100%', padding: 8 }}>
              <option>Paneles Solares</option>
              <option>Climatización Inverter</option>
              <option>Bombas de Calor</option>
              <option>Servicio Técnico</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" style={{ width: '100%', padding: 8 }} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Correo 📧</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" type="email" style={{ width: '100%', padding: 8 }} />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Mensaje / Detalle ✏️</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Cuéntanos sobre tu proyecto" rows={3} style={{ width: '100%', padding: 8 }} />
          </div>
        </form>
      </div>

      <div className="chat-input" style={{ display: 'flex', gap: 8, padding: 12 }}>
        <button className="send-btn" onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Play size={16} /> ENVIAR POR WHATSAPP
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceContactForm;
