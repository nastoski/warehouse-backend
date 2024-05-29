import express from 'express';
import {
    createWarehouse,
    getAllWarehouses,
    getWarehouse,
    updateWarehouse,
    deleteWarehouse,
    addItemToWarehouse
} from '../controllers/warehouse.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createWarehouse);
router.get('/', getAllWarehouses);
router.get('/:id', getWarehouse);
router.put('/:id', verifyToken, updateWarehouse);
router.delete('/:id', verifyToken, deleteWarehouse);
router.post('/add-item', addItemToWarehouse);

export default router;
