import User from '../models/user.models.js';

export const unfollowUser = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.params.id;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== targetUserId
        );
        targetUser.followers = targetUser.followers.filter(
            (id) => id.toString() !== currentUserId
        );

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({
            message: "User unfollowed successfully",
            status: "success",
        });
    } catch (err) {
        res.status(500).json({ message: "Unfollow failed", error: err.message });
    }
};
