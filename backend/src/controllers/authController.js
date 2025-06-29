// [User clicks "Forgot Password"]
//      ↓
// [Check user + apply rate limit (5 mins)]
//      ↓
// [Generate JWT (5 min expiry) + store iat in DB]
//      ↓
// [Send reset link with token to email]
//      ↓
// [User clicks link → POST /reset-password with token + new password]
//      ↓
// [Verify JWT & check decoded.iat ≥ resetPasswordIssuedAt]
//      ↓
// [If valid → update password → success]


import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import sendEmail from "../utils/sendEmail.js"; // your custom mail sender

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
    console.log("Received forgot password request:", req.body);
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.authMethod === "google")
        return res.status(400).json({ error: "Please login with Google" });

    const now = Date.now();

    // Rate limit: 5 mins
    if (user.lastResetRequestTime && now - user.lastResetRequestTime < 5 * 60 * 1000) {
        return res.status(429).json({ error: "Please wait before requesting again" });
    }

    const issuedAt = Math.floor(now / 1000);

    const token = jwt.sign(
        { userId: user._id, issuedAt },
        process.env.JWT_SECRET,
        { expiresIn: "5m" }
    );

    user.resetPasswordIssuedAt = issuedAt;
    user.lastResetRequestTime = now;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
        to: email,
        subject: "Password Reset",
        text: `Reset your password using the following link: ${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 5 minutes.</p>`,
    });

    res.json({ message: "Reset password link has been sent to your email." });
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
        return res.status(400).json({ error: "Token and new password are required" });

    if (newPassword.length < 6)
        return res.status(400).json({ error: "Password must be at least 6 characters long" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { userId, issuedAt } = decoded;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.resetPasswordIssuedAt !== issuedAt)
            return res.status(400).json({ error: "Token is invalid or expired" });


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Cleanup
        user.resetPasswordIssuedAt = null;
        user.lastResetRequestTime = null;
        await user.save();

        res.json({ message: "Password has been reset successfully." });
    } catch (err) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }
};

// POST /api/auth/verify-email
// This endpoint is used to verify the user's email after registration
export const verifyEmail = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token is required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.isEmailVerified = true;
        await user.save();

        res.json({ message: "Email verified successfully." });
    } catch (err) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }
}