import Warehouse from '../models/Warehouse.js';

// Create a new warehouse
export const createWarehouse = async (req, res, next) => {
    try {
        const newWarehouse = new Warehouse(req.body);
        await newWarehouse.save();
        res.status(201).json(newWarehouse);
    } catch (err) {
        next(err);
    }
};

// Get all warehouses
export const getAllWarehouses = async (req, res, next) => {
    try {
        const warehouses = await Warehouse.find().populate('items.item');
        res.status(200).json(warehouses);
    } catch (err) {
        next(err);
    }
};

// Get a single warehouse by ID
export const getWarehouse = async (req, res, next) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) return next(createError(404, "Warehouse not found!"));
        res.status(200).json(warehouse);
    } catch (err) {
        next(err);
    }
};

// Update a warehouse
export const updateWarehouse = async (req, res, next) => {
    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWarehouse) return next(createError(404, "Warehouse not found!"));
        res.status(200).json(updatedWarehouse);
    } catch (err) {
        next(err);
    }
};

// Delete a warehouse
export const deleteWarehouse = async (req, res, next) => {
    try {
        const deletedWarehouse = await Warehouse.findByIdAndDelete(req.params.id);
        if (!deletedWarehouse) return next(createError(404, "Warehouse not found!"));
        res.status(200).json("Warehouse has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const addItemToWarehouse = async (req, res) => {
    const { itemId, quantity, warehouseId } = req.body;

    try {
        const warehouse = await Warehouse.findById(warehouseId);

        if (!warehouse) {
            return res.status(404).json({ success: false, message: 'Warehouse not found' });
        }

        // Add item to warehouse
        const existingItemIndex = warehouse.items.findIndex(item => item.item.equals(itemId));
        if (existingItemIndex !== -1) {
            warehouse.items[existingItemIndex].quantity += quantity;
        } else {
            warehouse.items.push({ item: itemId, quantity });
        }

        await warehouse.save();

        res.status(200).json({ success: true, message: 'Item added to warehouse successfully' });
    } catch (error) {
        console.error('Error adding item to warehouse:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};