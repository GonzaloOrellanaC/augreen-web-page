import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const fromEmail = process.env.FROM_EMAIL || `no-reply@localhost`;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
});

type SendArgs = { to: string; subject: string; text?: string; html?: string };

export async function sendEmail({ to, subject, text, html }: SendArgs): Promise<any> {
  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      text,
      html
    });
    return info;
  } catch (err) {
    throw err;
  }
}
