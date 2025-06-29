import express from "express";
import { forgotPassword, resetPassword, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);

export default router;
