import User from '../models/user.models.js';

const getAllUsers = async (req, res) => {
  try {
    // Get all users with populated plan details
    const users = await User.find()
      .limit(4)
      .select('-password -accountVerificationToken -accountVerificationExpires -googleId -authMethod -resetPasswordIssuedAt -lastResetRequestTime -lastLogin -createdAt -updatedAt')
      .populate({
        path: 'plan',
        select: 'name canBrowse canPost canFeature canComment postLimit',
      })
      .lean(); // Convert to plain JavaScript objects

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Optional: Transform the data further if needed
    const transformedUsers = users.map(user => ({
      ...user,
      // You can add additional transformations here if needed
    }));

    res.status(200).json({
      success: true,
      count: users.length,
      data: transformedUsers,
    });

  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export default getAllUsers;