import express from 'express';
import Stripe from 'stripe';
import User from '../models/user.models.js';
import Plan from '../models/plan.models.js';
import Payment from '../models/payment.models.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('⚠️ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const planId = session.metadata.planId;
        const paymentId = session.metadata.paymentId;
        const stripeTransactionId = session.payment_intent;

        try {
            const user = await User.findById(userId);
            const plan = await Plan.findById(planId);
            const payment = await Payment.findById(paymentId);

            if (!user || !plan || !payment) {
                console.error('Missing user, plan, or payment info');
                return res.status(400).json({ message: 'Invalid metadata' });
            }

            const expiry = new Date();
            expiry.setDate(expiry.getDate() + plan.durationDays);

            // ✅ Update user
            user.plan = plan._id;
            user.hasSelectedPlan = true;
            user.planExpireDate = expiry;
            await user.save();

            // ✅ Update payment
            payment.status = 'completed';
            payment.transactionId = stripeTransactionId;
            payment.paidAt = new Date();
            await payment.save();

            console.log(`✅ Payment completed for user ${user.fullname}`);
        } catch (err) {
            console.error('❌ Error processing payment webhook:', err);
        }
    }

    res.status(200).json({ received: true });
});

export default router;
