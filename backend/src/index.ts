import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { attachSockets } from './socket';
import contactRouter from './routes/contact';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5120;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:8100';

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

// Static uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ filename: req.file.filename, url: fileUrl });
});

// Contact route (POST /api/contact)
app.use('/api/contact', contactRouter);

// Simple health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Attach Socket.IO
attachSockets(server);

// Serve frontend static files if they exist (build output)
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
console.log('Checking for frontend static files in:', frontendDist);
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  // Fallback to index.html for client-side routing (ignore API and uploads paths)
  app.get('*', (req, res) => {
    console.log('Received request for:', req.path);
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return res.status(404).end();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
