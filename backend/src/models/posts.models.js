import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        images: {
            type: [
                {
                    url: { type: String, required: true },
                    public_id: { type: String, required: true },
                }
            ],
            validate: {
                validator: function (arr) {
                    return arr.length >= 1 && arr.length <= 3;
                },
                message: "Post must contain 1 or 3 images.",
            },
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: String,
            enum: ['House', 'Apartment', 'Plot', 'Office', 'Shop', 'Farmhouse'],
            required: true,
        },
        viewsCount: { type: Number, default: 0 },
        // Interactions
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        // viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // Flag for moderation
        isBlocked: { type: Boolean, default: false },

        // Featured or not
        isFeatured: { type: Boolean, default: false },

        // New fields for real estate
        garage: { type: Number, min: 0, default: 0 },
        balcony: { type: Number, min: 0, default: 0 },
        baths: { type: Number, min: 0, default: 0 },
        beds: { type: Number, min: 0, default: 0 },
        area: { type: Number, min: 0, default: 0 }, // in square feet or meters
        price: { type: Number, min: 0, default: 0 },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;