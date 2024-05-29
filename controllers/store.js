import Store from '../models/Store.js';

export const createStore = async (req, res, next) => {
    try {
        const newStore = new Store(req.body);
        await newStore.save();
        res.status(201).json(newStore);
    } catch (err) {
        next(err);
    }
};

export const getAllStores = async (req, res, next) => {
    try {
        const stores = await Store.find().populate('items.item');
        res.status(200).json(stores);
    } catch (err) {
        next(err);
    }
};

export const getStore = async (req, res, next) => {
    try {
        const store = await Store.findById(req.params.id).populate('items.item');
        if (!store) return next(createError(404, "Store not found!"));
        res.status(200).json(store);
    } catch (err) {
        next(err);
    }
};

export const updateStore = async (req, res, next) => {
    try {
        const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStore) return next(createError(404, "Store not found!"));
        res.status(200).json(updatedStore);
    } catch (err) {
        next(err);
    }
};

export const deleteStore = async (req, res, next) => {
    try {
        const deletedStore = await Store.findByIdAndDelete(req.params.id);
        if (!deletedStore) return next(createError(404, "Store not found!"));
        res.status(200).json("Store has been deleted.");
    } catch (err) {
        next(err);
    }
};