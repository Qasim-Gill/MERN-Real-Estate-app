import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // Basic user information
        fullname: {
            type: String,
            required: true, // Full name is required
        },
        image: {
            type: Object,
            default: null, // User profile picture or avatar
        },
        email: {
            type: String,
            required: false, // Optional if using Google login
        },
        password: {
            type: String,
            required: false, // Optional if using Google login
        },
        googleId: {
            type: String,
            required: false, // Used only if the user signs in with Google
        },
        category: {
            type: String,
            enum: ['Buyer', 'Seller', 'Agent', 'Builder', 'Default'],
            required: true,
        },
        authMethod: {
            type: String,
            enum: ["google", "local"],
            required: true,
            default: "local", // Indicates if the user signed up with email/password or Google
        },

        // Used when the user signs up with email/password and request to reset password
        // i am using jwt token to reset password and it has expiry time of 5 minutes
        // This field stores the issued time of the reset password token
        // It is used to check if the token is still valid when the user tries to reset their password
        // it is also helpful to prevent multiple reset requests within a short time frame
        resetPasswordIssuedAt: {
            type: Number,
            default: null,
        },
        lastResetRequestTime: {
            type: Number,
            default: null,
        },

        // Token sent to the user's email for account verification (e.g. after signup)
        accountVerificationToken: {
            type: String,
            default: null,
        },

        // Expiry time for the account verification token (e.g. valid for 24 hours)
        accountVerificationExpires: {
            type: Date,
            default: null,
        },

        // Subscription or usage plan selected by the user
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
        },

        // Indicates if the user has verified their email
        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        // Indicates whether the user has selected a plan (used for conditional access)
        hasSelectedPlan: { type: Boolean, default: false },

        // Date when the user's plan expires (if applicable)
        // This can be used to manage subscription renewals or access control
        planExpireDate: { type: Date, default: null},

        // Stores the timestamp of the user's most recent login
        lastLogin: { type: Date, default: Date.now },

        // Users whom this user is following
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // Users who follow this user
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
