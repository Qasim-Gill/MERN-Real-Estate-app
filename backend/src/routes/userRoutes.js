import express from 'express';
import profileImageUploads from '../middlewares/profileImageUploads.js';
import validateRegister from '../middlewares/validateRegister.js';
import registerUser from '../controllers/register.js';
import loginUser from '../controllers/login.js';

import auth from '../middlewares/auth.js';
import getMe from '../controllers/userInfo.js';
import logoutUser from '../controllers/logoutUser.js';

import { googleAuth } from '../controllers/googleAuth.js';

import { selectPlan } from '../controllers/selectPlan.js';

import { confirmPlanPayment } from '../controllers/confirmPlanPayment.js';

import { selectUserCategory } from '../controllers/selectCategory.js';

import { followUser } from '../controllers/followUser.js';
import { unfollowUser } from '../controllers/unfollowUser.js';

import { verifyPayment } from '../controllers/verifyPayment.js';

import getAllUsers from '../controllers/getAllUsers.js';




const router = express.Router();

// Register route
router.post('/register', profileImageUploads.single('image'), validateRegister, registerUser);

// Login route
router.post('/login', loginUser);

// Get current user info
router.get('/me', auth, getMe);

// logout using clear cookies
router.post('/logout', auth, logoutUser);

// google auth route
router.post('/google', googleAuth);

// Select Plan after registering or logning in
router.post('/select-plan', auth, selectPlan);

// Confirm plan payment after selecting a plan
router.post('/confirm-plan-payment', auth, confirmPlanPayment);

// Verify payment after confirming plan payment
router.post('/verify-payment', auth, verifyPayment);

// Select user category after selecting a plan
router.post('/select-category', auth, selectUserCategory);

// Get all users (public route) /api/users/getAll
router.get('/getAll', getAllUsers);

// Follow another user /api/users/:id/follow
router.post('/:id/follow', auth, followUser);

// Unfollow a user /api/users/:id/unfollow
router.post('/:id/unfollow', auth, unfollowUser);

export default router;
