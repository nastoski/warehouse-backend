import express from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// get all users
router.get("/find", getAllUsers);

// get a user by id
router.get("/find/:id", getUser);

//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

export default router;