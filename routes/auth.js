import express from "express";
import { createUser, userLogin } from "../controllers/auth.js";
import { verifyToken, verifyUser } from "../verifyToken.js";

const router = express.Router();

// check auth
router.get('/check-status', verifyUser, (req, res, next) => {
    res.send('hello you are authenticated')
});

//CREATE A USER
router.post("/register", createUser);

//SIGN IN
router.post("/login", userLogin);

export default router;