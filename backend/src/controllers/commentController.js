import Post from '../models/posts.models.js';
import User from '../models/user.models.js';
import Plan from '../models/plan.models.js';
import Comment from '../models/comment.models.js';

// POST /api/comments
// Check if the user has a plan and it is active and it allowed to comment
// and user has verified email
// Then create a new comment
// request body should contain text, postId, and userId
export const createComment = async (req, res) => {
    const { text, postId } = req.body;
    const userId = req.user.id;

    if (!text || !postId) {
        return res.status(400).json({ error: 'Text and postId are required' });
    }

    try {
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        
        // Check if the user has a plan and it is active
        const user = await User.findById(userId).populate('plan');
        if (!user || !user.plan || user.hasSelectedPlan !== true || user.planExpireDate < new Date()) {
            return res.status(403).json({ error: 'You need an active plan to comment' });
        }

        // Check if Plan exists and is active
        const plan = await Plan.findById(user.plan);

        if (!plan.canComment) {
            return res.status(403).json({ error: 'Your Current Plan does not allowed to Post Comment' });
        }

        // Check if the user has verified their email
        if (!user.isEmailVerified) {
            return res.status(403).json({ error: 'Please verify your email to comment' });
        }

        // Create the comment
        const comment = new Comment({
            text,
            author: userId,
            post: postId,
        });
        await comment.save();

        // now send response with the created comment
        res.status(201).json({
            message: 'Comment created successfully',
            comment: {
                _id: comment._id,
                text: comment.text,
            }
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// GET /api/comments/:postId
// Fetch all comments for a specific post
export const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Fetch comments for the post
        const comments = await Comment.find({ post: postId })
            .populate('author', 'fullname category image') // Populate author details
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            message: 'Comments fetched successfully',
            comments,
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}