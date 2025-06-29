// controllers/googleAuth.js
// This single POST /google endpoint handles both Google registration and login
// depending on whether the user already exists in the database.
// It’s stateless, uses JWT, and stores the token in an httpOnly cookie for authentication.

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
    try {
        // Destructure the credential (Google ID token) sent from frontend
        const { credential } = req.body;

        // Verify the ID token using Google API
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID, // Make sure it matches your client ID
        });

        // Extract the user info from the verified token
        const payload = ticket.getPayload();
        const { email, name, picture, email_verified } = payload;

        // Security check: only accept verified Google accounts
        // Sometimes users can have unverified emails on google
        // This is important to prevent spam or fake accounts
        if (!email_verified) {
            return res.status(400).json({ message: 'Email not verified by Google' });
        }

        // Check if user already exists in your DB
        const user = await User.findOne({ email })
            .select('-accountVerificationToken -accountVerificationExpires')
            .populate({
                path: 'plan',
                select: 'name postLimit canBrowse canPost canFeature canComment durationDays price'
            });

        // Prevent login if this email was registered via password before
        // This avoids mixing different auth methods (email/pass vs Google)
        if (user && user.authMethod !== 'google') {
            return res.status(400).json({
                message: 'Email registered with another method. Use email/password login.',
            });
        }

        // If user does not exist, create a new account
        if (!user) {
            user = await User.create({
                fullname: name,
                email,
                password: null, // Password is null for Google-auth users
                image: { url: picture, public_id: null },
                category: 'Default', // Default category (can be changed later)
                authMethod: 'google', // Mark how this user authenticated
                hasSelectedPlan: false,
                plan: null,
                isEmailVerified: email_verified,
            });
        }

        // Generate JWT token (stateless authentication)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Valid for 7 days
        });

        // Set JWT in an HTTP-only cookie (prevents JS access, improves security)
        // Set token in cookie
        // I spent too much time to debug this cookie issue, so I will explain it here:
        // 1. The cookie is set with httpOnly and secure flags to prevent XSS
        // 2. The secure flag is set to true because we are using sameSite: 'none'
        // 3. The sameSite is set to 'none' because the frontend and backend
        res.cookie('token', token, {
            httpOnly: true, // prevents JS access to the cookie
            secure: true, // because sameSite is none  
            sameSite: 'none', // frontend and backend are both on different ports so strict and lax will not work
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/', // cookie accessible on all routes
            domain: 'localhost' // Set to your domain if deploying
        });

        let nextStep = '/home';
        if (user.hasSelectedPlan == false) {
            nextStep = '/select-plan';
        }else if (user.category == "Default") {
            nextStep = '/select-category';
        }

        // Prepare the response object
        const response = {
            _id: user._id,
            fullname: user.fullname,
            image: user.image,
            email: user.email,
            category: user.category,
            authMethod: user.authMethod,
            isEmailVerified: user.isEmailVerified,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            following: user.following,
            followers: user.followers,
            hasSelectedPlan: user.hasSelectedPlan,
            planExpireDate: user.planExpireDate
        };

        // Only include plan details if user has selected a plan
        if (user.hasSelectedPlan && user.plan) {
            response.plan = {
                name: user.plan.name,
                price: user.plan.price,
                durationDays: user.plan.durationDays,
                features: {
                    postLimit: user.plan.postLimit,
                    canBrowse: user.plan.canBrowse,
                    canPost: user.plan.canPost,
                    canFeature: user.plan.canFeature,
                    canComment: user.plan.canComment
                },
                expiresIn: user.planExpireDate
                    ? Math.ceil((user.planExpireDate - Date.now()) / (1000 * 60 * 60 * 24)) + ' days'
                    : 'Not set'
            };
        }

        // Send success response with user data (excluding sensitive fields)
        res.status(200).json({
            message: 'Google login successful',
            token,
            user: response,
            // user: {
            //     id: user._id,
            //     fullname: user.fullname,
            //     email: user.email,
            //     image: user.image,
            //     category: user.category,
            //     plan: user.plan,
            // },
            nextStep
        });

    } catch (error) {
        // Handle unexpected errors
        console.error('Google Auth Error:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
};
