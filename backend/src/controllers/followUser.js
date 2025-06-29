import User from '../models/user.models.js';

export const followUser = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        if (currentUserId === targetUserId) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found" });
        }

        if (
            currentUser.following.includes(targetUserId) ||
            targetUser.followers.includes(currentUserId)
        ) {
            return res.status(400).json({ message: "Already following this user" });
        }

        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUserId);

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({
            message: "User followed successfully",
            status: "success",
        });
    } catch (err) {
        res.status(500).json({ message: "Follow failed", error: err.message });
    }
};
