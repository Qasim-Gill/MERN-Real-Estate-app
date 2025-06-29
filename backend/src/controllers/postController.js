import Post from '../models/posts.models.js';
import User from '../models/user.models.js';
import Plan from '../models/plan.models.js';
import cloudinary from '../utils/cloudinary.js';
import mongoose from 'mongoose';

// Express matches routes in order

// Create a new post
export const createPost = async (req, res) => {
    const { title, description, category, garage, balcony, baths, beds, area, price, isFeatured } = req.body;

    const userId = req.user.id;

    try {

        const user = await User.findById(userId);
        const plan = await Plan.findById(user.plan);

        // If user want to set it featured but plan does not allowed
        if (isFeatured && !plan.canFeature){
            return res.status(403).json({ message: "Your Current Plan does not allow to feature Post" })
        }

        // if category is within list
        const allowedCategories = ['House', 'Apartment', 'Plot', 'Office', 'Shop', 'Farmhouse'];
        if (category.length > 0 && !allowedCategories.includes(category)) {
            return res.status(403).json({ message: "Category is not authorized" });
        }

        // Check user plan
        if (!user.hasSelectedPlan || !user.plan || !plan.canPost) {
            return res.status(403).json({ message: 'Your plan does not allow posting.' });
        }

        // User should verify its email before posting
        if (!user.isEmailVerified) {
            return res.status(403).json({ message: 'User Email is not verified' });
        }

        // Enforce post limit
        const userPostsCount = await Post.countDocuments({ author: userId });
        if (plan.postLimit && userPostsCount >= plan.postLimit) {
            return res.status(403).json({ message: 'You have reached your post limit.' });
        }

        // Handle multiple image uploads
        let imageData = [];

        const uploadFromBuffer = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'post_images' },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(buffer);
            });
        };

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one image.' });
        }

        if (req.files.length > 3) {
            return res.status(400).json({ message: 'You can upload a maximum of 3 images.' });
        }

        for (const file of req.files) {
            const result = await uploadFromBuffer(file.buffer);
            imageData.push({ url: result.secure_url, public_id: result.public_id });
        }

        const post = new Post({
            title,
            description,
            category,
            garage,
            balcony,
            baths,
            beds,
            area,
            price,
            isFeatured,
            images: imageData,
            author: userId
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ isBlocked: false })
            .populate('author', 'fullname image category')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

// Get single post by ID
export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        // console.log('Requested Post ID:', postId);

        const post = await Post.findById(postId)
            .populate('author', 'fullname image category');

        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        }

        // const post = await Post.findById(req.params.id)
        //     .populate('author', 'fullname image category');
        // if (!post) return res.status(404).json({ message: 'Post not found' });

        // Add viewer if not already viewed
        // TODO: Implement user authentication check
        // Placeholder: Check if user is logged in
        if (Array.isArray(post.viewers) && !post.viewers.includes(req.user?.id) && false) {
            post.viewers.push(req.user.id);
            post.viewsCount += 1;
            await post.save();
        }

        res.status(200).json(post);
    } catch (err) {
        console.error('Error fetching post:', err.message);
        res.status(500).json({ message: 'Failed to fetch post' });
    }
};

// Helper: Upload a single image buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'post_images' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

// Update a post
export const updatePost = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, category, garage, balcony, baths, beds, area, price, isFeatured } = req.body;

    try {
        const post = await Post.findById(id);
        const user = await User.findById(userId);
        const plan = await Plan.findById(user.plan);
        
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        // if category is within list
        const allowedCategories = ['House', 'Apartment', 'Plot', 'Office', 'Shop', 'Farmhouse'];
        if (category.length > 0 && !allowedCategories.includes(category)) {
            return res.status(403).json({ message: "Category is not authorized" });
        }

        // If user want to set it featured but plan does not allowed
        if (isFeatured && !plan.canFeature){
            return res.status(403).json({ message: "Your Current Plan does not allow to feature Post" })
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this post' });
        }

        // Handle image replacement only if new files are uploaded
        if (req.files && req.files.length > 0) {
            // Delete old images
            for (const img of post.images) {
                try {
                    await cloudinary.uploader.destroy(img.public_id);
                } catch (err) {
                    console.error(`Failed to delete image ${img.public_id}:`, err);
                }
            }

            // Upload new images
            const uploadedImages = [];
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                uploadedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }

            // Validation: min 1, max 3
            if (uploadedImages.length < 1 || uploadedImages.length > 3) {
                return res.status(400).json({ message: 'You must upload between 1 and 3 images.' });
            }

            post.images = uploadedImages;
        }

        // Update other fields
        if (title) post.title = title;
        if (description) post.description = description;
        if (category) post.category = category;
        if (garage) post.garage = garage;
        if (balcony) post.balcony = balcony;
        if (baths) post.baths = baths;
        if (beds) post.beds = beds;
        if (area) post.area = area;
        if (price) post.price = price;
        if (isFeatured) post.isFeatured = isFeatured;

        await post.save();

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update post' });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        // Delete all associated images from Cloudinary
        if (post.images && post.images.length > 0) {
            for (const img of post.images) {
                try {
                    await cloudinary.uploader.destroy(img.public_id);
                } catch (err) {
                    console.error(`Failed to delete image ${img.public_id}:`, err);
                }
            }
        }

        // Delete the post from MongoDB
        await Post.findByIdAndDelete(id);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.log("Error deleting post:", err);
        res.status(500).json({ message: 'Failed to delete post' });
    }
};

// Like a post
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.user.id;

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
        } else {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        }

        await post.save();
        res.status(200).json({ likes: post.likes, dislikes: post.dislikes });
    } catch (err) {
        res.status(500).json({ message: 'Failed to like post' });
    }
};

// Dislike a post
export const dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const userId = req.user.id;

        if (!post.dislikes.includes(userId)) {
            post.dislikes.push(userId);
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
        }

        await post.save();
        res.status(200).json({ likes: post.likes, dislikes: post.dislikes });
    } catch (err) {
        res.status(500).json({ message: 'Failed to dislike post' });
    }
};

// Feature a post (Only if plan allows it)
export const featurePost = async (req, res) => {
    try {
        const user = await User.findById(req.user?.id).populate('plan');
        if (!user.plan?.canFeature) {
            return res.status(403).json({ message: 'Your plan does not allow featuring posts' });
        }

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // You can define logic here: maybe mark it with a "featured" flag, or move to a featured collection
        post.isFeatured = true;
        await post.save();

        res.status(200).json({ message: 'Post marked as featured' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to feature post' });
    }
};


// Get all posts of the current logged-in user
export const getMyPosts = async (req, res) => {
    try {
        const myPosts = await Post.find({ author: req.user.id })
            .sort({ createdAt: -1 }); // most recent first

        res.status(200).json(myPosts);
    } catch (err) {
        console.error('Error fetching user posts:', err);
        res.status(500).json({ message: 'Failed to fetch your posts' });
    }
};

// Search and filter posts
// Controller function to handle searching, filtering, and sorting posts
export const searchPosts = async (req, res) => {
    try {
        // Destructure query parameters from the request URL
        // Example: /api/posts/search?title=house&category=Plot&sortBy=likes
        const { title, category, sortBy } = req.query;

        // Base filter: Only return posts that are not blocked
        let filter = { isBlocked: false };

        // If 'title' is provided in query, add a case-insensitive search filter
        // $regex: matches the text pattern, $options: 'i' makes it case-insensitive
        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        // If 'category' is provided in query, filter posts by category
        if (category) {
            filter.category = category;
        }

        // Default sort option: newest posts first
        let sortOption = { createdAt: -1 };

        // Modify sort option based on query param 'sortBy'
        if (sortBy === 'likes') sortOption = { likesCount: -1 }; // most liked first
        if (sortBy === 'oldest') sortOption = { createdAt: 1 };  // oldest posts first
        if (sortBy === 'newest') sortOption = { createdAt: -1 }; // newest first
        // if (sortBy === 'views') sortOption = { viewsCount: -1 }; // most viewed first

        // Use MongoDB's aggregation pipeline for advanced operations
        const posts = await Post.aggregate([
            // Match posts based on search filters
            { $match: filter },

            // Dynamically add computed fields like like and dislike counts
            {
                $addFields: {
                    likesCount: { $size: "$likes" },         // Count total likes
                    dislikesCount: { $size: "$dislikes" },   // Count total dislikes
                }
            },

            // Sort the result based on chosen criteria
            { $sort: sortOption }
        ]);

        // Return the filtered, sorted post list
        res.status(200).json(posts);

    } catch (err) {
        // Return error if anything goes wrong
        res.status(500).json({ message: 'Failed to search or filter posts' });
    }
};
