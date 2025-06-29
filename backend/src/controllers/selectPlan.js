import User from '../models/user.models.js';
import Plan from '../models/plan.models.js';

// Controller to handle plan selection by user
export const selectPlan = async (req, res) => {
    const userId = req.user.id;
    const { planId } = req.body;
    console.log('Select Plan Request:', { userId, planId });

    try {
        const plan = await Plan.findById(planId);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // If plan is paid, return a message to client to start payment
        if (plan.price > 0) {
            return res.status(200).json({
                message: 'Paid plan. Proceed to payment.',
                nextStep: `/confirm-plan-payment/${plan._id}`,
                // isPaidPlan: true,
                // planId: plan._id,
                // planDetails: {
                //     name: plan.name,
                //     price: plan.price,
                //     durationDays: plan.durationDays,
                //     description: plan.description
                // }
            });
        }

        // If free plan, activate directly
        user.plan = plan._id;
        user.hasSelectedPlan = true;

        const today = new Date();
        const expiry = new Date(today.setDate(today.getDate() + plan.durationDays));
        user.planExpireDate = expiry;

        await user.save();

        res.status(200).json({
            nextStep: '/select-category', // Redirect to select category after plan selection
            message: 'Free plan selected successfully' 
        });
    } catch (err) {
        console.error('Select Plan Error:', err);
        res.status(500).json({ message: 'Plan selection failed' });
    }
};
