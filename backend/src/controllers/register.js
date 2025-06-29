import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';
import cloudinary from '../utils/cloudinary.js'; // Your Cloudinary config
import sendEmail from "../utils/sendEmail.js"; // your custom mail sender

const registerUser = async (req, res) => {
    try {
        // console.log('Received registration request:', req.body);
        const { fullname, email, password } = req.body;
        const category = req.body.category || 'Default'; // Default to 'Default' if not provided

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let imageData = null;

        // Upload image buffer to Cloudinary if image exists
        if (req.file && req.file.buffer) {
            // Helper to upload buffer to Cloudinary
            const uploadFromBuffer = (buffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: 'user_profiles' },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(buffer);
                });
            };

            const uploadResult = await uploadFromBuffer(req.file.buffer);

            imageData = {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            };
        }

        // Create user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            image: imageData,
            category,
            authMethod: 'local',
            plan: null,
            hasSelectedPlan: false,
        });

        // Generate JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

        await sendEmail({
            to: email,
            subject: "Email Verification",
            text: `Verify your email using the following link: ${verificationLink}`,
            html: `<p>Click <a href="${verificationLink}">here</a> to Verify your mail. This link is valid for 7 days.</p>`,
        });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                category: newUser.category,
                image: newUser.image,
                plan: null,
            },
            nextStep: 'select-plan',
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default registerUser;
