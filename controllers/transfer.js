import Warehouse from '../models/Warehouse.js';
import Store from '../models/Store.js';

export const transferItemToStore = async (req, res) => {
    const { itemId, quantity, warehouseId, storeId } = req.body;

    try {
        const warehouse = await Warehouse.findById(warehouseId);
        const store = await Store.findById(storeId);

        if (!warehouse || !store) {
            return res.status(404).json({ success: false, message: 'Warehouse or store not found' });
        }

        // Check if item exists in warehouse and has enough quantity
        const result = warehouse.transferItemToStore(itemId, quantity);
        if (!result.success) {
            return res.status(400).json({ success: false, message: result.message });
        }

        // Add item to store
        const storeResult = store.transferItemFromWarehouse(itemId, quantity);
        if (!storeResult.success) {
            return res.status(400).json({ success: false, message: storeResult.message });
        }

        await warehouse.save();
        await store.save();

        res.status(200).json({ success: true, message: 'Item transferred from warehouse to store successfully' });
    } catch (error) {
        console.error('Error transferring item to store:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};