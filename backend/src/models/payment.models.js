import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        // Reference to the user who made the payment
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        // Reference to the plan purchased (e.g. Free, Premium, Agent Plan, etc.)
        plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },

        // Amount paid by the user in the selected currency
        amount: { type: Number, required: true },

        // Current payment status
        // 'pending' = payment initiated, waiting for confirmation
        // 'completed' = payment successful
        // 'failed' = payment attempt failed
        // 'refunded' = payment was refunded manually or automatically
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },

        // Unique invoice number for this transaction (e.g., used in receipt/invoice)
        invoiceNumber: {
            type: String,
            unique: true,
        },

        // Payment method used (e.g. Stripe, PayPal, etc.)
        // Default is 'stripe' since that's what you're using now
        paymentMethod: {
            type: String,
            default: "stripe",
        },

        // Currency used for the payment (default is USD)
        currency: {
            type: String,
            default: "USD",
        },

        // Stripe transaction ID (e.g. charge ID or paymentIntent ID)
        transactionId: {
            type: String,
        },

        // Timestamp when the payment was successfully completed
        paidAt: { type: Date },
    },
    {
        // Automatically track createdAt and updatedAt timestamps
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;