import express from "express";
import { createUser, userLogin } from "../controllers/auth.js";
import { verifyAdmin, verifyToken } from "../verifyToken.js";

const router = express.Router();

//CREATE A USER
router.post("/register", verifyToken, verifyAdmin, createUser)

//SIGN IN
router.post("/login", userLogin)

export default router;