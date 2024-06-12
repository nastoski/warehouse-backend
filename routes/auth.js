import express from "express";
import { createUser, userLogin } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// check auth
router.get('/check-status', verifyToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

//CREATE A USER
router.post("/register", createUser);

//SIGN IN
router.post("/login", userLogin);

// clear token on logout
router.post('/logout', (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        path: '/',
        domain: 'warehouse-backend-x3m-labs.vercel.app',secure: true,
        sameSite: 'None'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;