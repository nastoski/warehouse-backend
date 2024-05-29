import express from 'express';
import {
    createItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem
} from '../controllers/item.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Item routes
router.post('/', verifyToken, createItem);
router.get('/', getAllItems);
router.get('/:id', getItem);
router.put('/:id', verifyToken, updateItem);
router.delete('/:id', verifyToken, deleteItem);

export default router;