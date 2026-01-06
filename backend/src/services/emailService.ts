import { sendEmail } from '../email';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(payload: ContactPayload) {
  const to = process.env.CONTACT_EMAIL || 'contacto@augreen.cl';
  const subject = `Formulario de contacto: ${payload.name}`;
  const text = `Nuevo mensaje de contacto:\n\nNombre: ${payload.name}\nEmail: ${payload.email}\n\nMensaje:\n${payload.message}`;
  const html = `<p>Nuevo mensaje de contacto</p>
<p><strong>Nombre:</strong> ${payload.name}</p>
<p><strong>Email:</strong> ${payload.email}</p>
<p><strong>Mensaje:</strong><br/>${payload.message.replace(/\n/g, '<br/>')}</p>`;

  // sendEmail proviene de ../email (adaptador a Mailgun u otro proveedor)
  return sendEmail({ to, subject, text, html });
}
