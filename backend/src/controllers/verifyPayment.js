import Stripe from 'stripe';
import Payment from '../models/payment.models.js';
import User from '../models/user.models.js';
import Plan from '../models/plan.models.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const verifyPayment = async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ message: 'Missing session ID' });
    }

    try {
        // Retrieve the Checkout Session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return res.status(400).json({ message: 'Payment not completed' });
        }

        const { userId, planId, paymentId } = session.metadata;

        // Look up user, plan, and payment
        const [user, plan, payment] = await Promise.all([
            User.findById(userId),
            Plan.findById(planId),
            // during confirm-plan-payment, we created a payment record
            Payment.findById(paymentId)
        ]);

        if (!user || !plan || !payment) {
            return res.status(404).json({ message: 'Invalid metadata in session' });
        }

        // Calculate expiration date
        const today = new Date();
        const expiryDate = new Date(today.setDate(today.getDate() + plan.durationDays));

        // Update user plan info
        user.plan = plan._id;
        user.hasSelectedPlan = true;
        user.planExpireDate = expiryDate;
        await user.save();

        // Update payment invoice record
        payment.status = 'completed';
        payment.paidAt = new Date();
        payment.transactionId = session.payment_intent; // Stripe payment intent ID
        payment.currency = session.currency || 'USD';
        payment.paymentMethod = 'stripe'; // You can update this later if you support more
        await payment.save();

        res.status(200).json({ message: 'Payment verified and plan activated successfully.' });
    } catch (err) {
        console.error('Payment verification error:', err);
        res.status(500).json({ message: 'Server error verifying payment' });
    }
};
