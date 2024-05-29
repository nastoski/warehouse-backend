import express from 'express';
import { transferItemToStore } from '../controllers/transfer.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/transfer-to-store', verifyToken, transferItemToStore);

export default router;
