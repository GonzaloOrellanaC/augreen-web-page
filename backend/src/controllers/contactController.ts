import { Request, Response } from 'express';
import { sendContactEmail } from '../services/emailService';

export async function handleContact(req: Request, res: Response) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields: name, email, message are required' });
    }

    await sendContactEmail({ name, email, message });
    return res.json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to send contact email' });
  }
}
