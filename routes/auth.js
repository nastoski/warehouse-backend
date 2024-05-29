import express from "express";
import { createUser, userLogin } from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/register", createUser);

//SIGN IN
router.post("/login", userLogin);

export default router;