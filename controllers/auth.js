import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can create employee accounts' });
        }
        const userExists = await User.findOne({ role: 'admin' });

        if (req.body.role === 'admin' && userExists) {
            return res.status(400).json({ message: 'Admin user already exists' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        res.status(201).send("User has been created!");

    } catch (err) {
        next(err);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT);

        const { password, ...others } = user._doc;

        res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            .status(200)
            .json({ message: "Login successful", user: others });
    } catch (err) {
        next(err);
    }
};