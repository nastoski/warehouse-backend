import express from 'express';
import {
    createStore,
    getAllStores,
    getStore,
    updateStore,
    deleteStore
} from '../controllers/store.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Store routes
router.post('/', verifyToken, createStore);
router.get('/', getAllStores);
router.get('/:id', getStore);
router.put('/:id', verifyToken, updateStore);
router.delete('/:id', verifyToken, deleteStore);

export default router;