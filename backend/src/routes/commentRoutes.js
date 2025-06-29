import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import {
  createComment,
  getCommentsByPost
} from '../controllers/commentController.js';

// so i came to know Express matches routes in order so first i should put static routes
// before dynamic routes like /:id

const router = express.Router();

// Create a new commment by checking if the user has a plan and it is active
// and it allowed to comment and user has verified email
// POST /api/comments request body should contain text, postId and authentication token is bearer token
router.post('/', authMiddleware, createComment);

// Get Comments by Post ID
// request params should contain postId
// GET /api/comments/:postId
router.get('/:postId', getCommentsByPost);

export default router;
