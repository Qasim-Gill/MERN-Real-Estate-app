import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email })
            .select('-accountVerificationToken -accountVerificationExpires')
            .populate({
                path: 'plan',
                select: 'name postLimit canBrowse canPost canFeature canComment durationDays price'
            });

        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Set token in cookie
        // I spent too much time to debug this cookie issue, so I will explain it here:
        // 1. The cookie is set with httpOnly and secure flags to prevent XSS
        // 2. The secure flag is set to true because we are using sameSite: 'none'
        // 3. The sameSite is set to 'none' because the frontend and backend
        res.cookie('token', token, {
            httpOnly: true, // prevents JavaScript access to the cookie
            secure: true, // because sameSite is none  
            sameSite: 'none', // frontend and backend are both on different ports so strict and lax will not work
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/', // cookie accessible on all routes
            domain: 'localhost' // Set to your domain if deploying
        });

        let nextStep = '/home';
        if (user.hasSelectedPlan == false) {
            nextStep = '/select-plan';
        } else if (user.category == "Default") {
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

        // res.json(response);

        // Send response without token in JSON (token is in cookie now)
        res.status(200).json({
            message: 'Login successful',
            nextStep,
            user: response,
            // user: {
            //     id: user._id,
            //     fullname: user.fullname,
            //     email: user.email,
            //     category: user.category,
            //     image: user.image?.url,
            //     plan: user.plan,
            // },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default loginUser;
