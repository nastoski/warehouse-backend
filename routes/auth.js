import express from "express";
import { createUser, userLogin } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// check auth
router.get('/check-status', verifyToken, (req, res) => {
    res.status(200).json({ message: 'User is authenticated' });
});

//CREATE A USER
router.post("/register", createUser);

//SIGN IN
router.post("/login", userLogin);

export default router;