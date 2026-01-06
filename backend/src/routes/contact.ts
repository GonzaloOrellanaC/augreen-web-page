import { Router } from 'express';
import { handleContact } from '../controllers/contactController';

const router = Router();

// POST /api/contact
router.post('/', handleContact);

export default router;
