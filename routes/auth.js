import express from "express";
import { createUser, userLogin } from "../controllers/auth.js";
import { verifyUser } from "../verifyToken.js";

const router = express.Router();

// check auth
router.get('/check-status', verifyUser, (req, res, next) => {
    res.send('hello you are authenticated')
});

//CREATE A USER
router.post("/register", createUser);

//SIGN IN
router.post("/login", userLogin);

// clear token on logout
router.post('/logout', (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;