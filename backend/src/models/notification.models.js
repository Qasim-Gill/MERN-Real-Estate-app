import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        // The user who receives the notification
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        // Notification type (useful for filtering, templates, etc.)
        // Examples: 'email_verification', 'plan_reminder', 'system_alert', 'promotion'
        type: {
            type: String,
            enum: ["email_verification", "plan_reminder", "system_alert", "promotion"],
            required: true,
        },

        // Main message to display in the UI
        message: {
            type: String,
            required: true,
        },

        // Optional URL to redirect when user clicks the notification
        actionLink: {
            type: String,
            default: null,
        },

        // Whether the user has read/seen the notification
        isRead: {
            type: Boolean,
            default: false,
        },

        // Optional: You can add expiry or auto-delete date if needed
        expiresAt: {
            type: Date,
            default: null,
        },

        // Whether the notification is currently active
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Automatically includes createdAt and updatedAt
    }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;