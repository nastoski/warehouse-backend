import { createError } from "../error.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id || req.user.role === 'admin') {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, 'You can update only your account or you must be an admin!'));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id || req.user.role === 'admin') {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been deleted.');
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, 'You can delete only your account or you must be an admin!'));
    }
};