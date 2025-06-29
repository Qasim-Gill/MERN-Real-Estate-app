import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import upload from '../middlewares/postImageUploader.js';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  featurePost,
  getMyPosts,
  searchPosts
} from '../controllers/postController.js';

// i got error when i tried to fetch posts for specific user getMyPosts
// so i came to know Express matches routes in order so first i should put static routes
// before dynamic routes like /:id

const router = express.Router();

// Create a new post (auth + plan check later)
// POST /api/posts
router.post('/', authMiddleware, upload.array('images', 3), createPost);

// Get all posts
// GET /api/posts
router.get('/', getAllPosts);

// Get only my posts
// GET /api/posts/myposts
router.get('/myposts', authMiddleware, getMyPosts);

// Search Filter
// GET /api/posts/myposts
router.get('/search', searchPosts);
// /api/posts/search?title=house
// /api/posts/search?category=Plot
// /api/posts/search?sortBy=likes
// /api/posts/search?title=modern&category=House&sortBy=likes

// Get post by ID
// GET /api/posts/:id
router.get('/:id', getPostById);

// Update a post (owner only)
// PUR GET /api/posts/:id
router.put('/:id', authMiddleware, upload.array('images', 3), updatePost);

// Delete a post (owner only)
// DELETE /api/posts/:id
router.delete('/:id', authMiddleware, deletePost);

// Like a post
// POST /api/posts/:id/like
router.post('/:id/like', authMiddleware, likePost);

// Dislike a post
// GET /api/posts/:id/dislike
router.post('/:id/dislike', authMiddleware, dislikePost);

// Feature a post
// POST /api/posts/:id/feature
router.post('/:id/feature', authMiddleware, featurePost);

export default router;
