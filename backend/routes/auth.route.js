import express from "express";
import {
  getAuthCheck,
  logoutUser,
  signInUser,
  signUpUser,
} from "../controllers/auth.controller.js";
import protectedRoute from "../middleWare/protectRoute.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.post("/log-out", logoutUser);
router.get("/auth-check", protectedRoute, getAuthCheck);

export default router;
