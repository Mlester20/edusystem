import express from "express";
import { register, login, updateUser } from "../controllers/user";
import { protect, authorize } from "../middleware/auth";

const userRoutes = express.Router();

//protect to get access to the user token
userRoutes.post(
    "/register", 
    protect, 
    authorize(["admin", "teacher"]),
    register
);
userRoutes.post("/login", login);
userRoutes.patch(
    "/update/:id", 
    protect, 
    authorize(["admin", "teacher"]),
    updateUser
);


export default userRoutes;