import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
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
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);

        const { password, ...others } = user._doc;

        res
            .cookie("access_token", token, {
                domain: 'warehouse-frontend-x3m-labs.vercel.app',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            })
            .status(200)
            .json(others);
    } catch (err) {
        next(err);
    }
};