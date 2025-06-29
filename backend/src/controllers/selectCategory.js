// controllers/userController.js
import User from '../models/user.models.js';

export const selectUserCategory = async (req, res) => {
    const { category } = req.body;
    const userId = req.user.id;
    // console.log('Select Category Request:', { userId, category });

    const validCategories = ['Buyer', 'Seller', 'Agent', 'Builder'];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category selected' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.category = category;
        await user.save();

        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
