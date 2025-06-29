import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        status: {
            type: Number,
            enum: [1, 2, 3], // 1: Approved, 2: Pending, 3: Deleted
            default: 2,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields and i can get newst comments first
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;