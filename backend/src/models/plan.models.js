import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    applicableTo: {
        type: [String], // ['Buyer', 'Seller', 'Agent', 'Builder']
        required: true,
    },
    price: { type: Number, required: true },
    durationDays: { type: Number, required: true }, // Validity
    postLimit: { type: Number, default: 0 },
    canBrowse: { type: Boolean, default: false },
    canPost: { type: Boolean, default: false },
    canFeature: { type: Boolean, default: false },
    canComment: { type: Boolean, default: false },
    description: { type: String },
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;