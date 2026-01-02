import mailgunFactory from 'mailgun-js';

const apiKey = process.env.MAILGUN_API_KEY || '';
const domain = process.env.MAILGUN_DOMAIN || '';
const fromEmail = process.env.FROM_EMAIL || `no-reply@${domain}`;

const mg = mailgunFactory({ apiKey, domain });

type SendArgs = { to: string; subject: string; text?: string; html?: string };

export function sendEmail({ to, subject, text, html }: SendArgs): Promise<any> {
  const data = {
    from: fromEmail,
    to,
    subject,
    text,
    html
  };
  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error: any, body: any) => {
      if (error) return reject(error);
      resolve(body);
    });
  });
}
