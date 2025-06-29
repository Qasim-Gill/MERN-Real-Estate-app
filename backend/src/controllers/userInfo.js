import User from '../models/user.models.js';
import Plan from '../models/plan.models.js';

const getMe = async (req, res) => {
  try {
    // Get user with populated plan details if exists
    const user = await User.findById(req.user.id)
      .select('-password -accountVerificationToken -accountVerificationExpires')
      .populate({
        path: 'plan',
        select: 'name postLimit canBrowse canPost canFeature canComment durationDays price'
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare the response object
    const response = {
      _id: user._id,
      fullname: user.fullname,
      image: user.image,
      email: user.email,
      category: user.category,
      authMethod: user.authMethod,
      isEmailVerified: user.isEmailVerified,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      following: user.following,
      followers: user.followers,
      hasSelectedPlan: user.hasSelectedPlan,
      planExpireDate: user.planExpireDate
    };

    // Only include plan details if user has selected a plan
    if (user.hasSelectedPlan && user.plan) {
      response.plan = {
        name: user.plan.name,
        price: user.plan.price,
        durationDays: user.plan.durationDays,
        features: {
          postLimit: user.plan.postLimit,
          canBrowse: user.plan.canBrowse,
          canPost: user.plan.canPost,
          canFeature: user.plan.canFeature,
          canComment: user.plan.canComment
        },
        expiresIn: user.planExpireDate 
          ? Math.ceil((user.planExpireDate - Date.now()) / (1000 * 60 * 60 * 24)) + ' days'
          : 'Not set'
      };
    }

    res.status(200).json(response);

  } catch (err) {
    console.error('Me route error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default getMe;
