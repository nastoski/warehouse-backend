import Item from '../models/Item.js';

export const createItem = async (req, res, next) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        next(err);
    }
};

export const getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        next(err);
    }
};

export const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return next(createError(404, "Item not found!"));
        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
};

export const updateItem = async (req, res, next) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return next(createError(404, "Item not found!"));
        res.status(200).json(updatedItem);
    } catch (err) {
        next(err);
    }
};

export const deleteItem = async (req, res, next) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return next(createError(404, "Item not found!"));
        res.status(200).json("Item has been deleted.");
    } catch (err) {
        next(err);
    }
};