import Stripe from 'stripe';
import User from '../models/user.models.js';
import Plan from '../models/plan.models.js';
import Payment from '../models/payment.models.js';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const confirmPlanPayment = async (req, res) => {
    const { planId } = req.body;
    const userId = req.user.id; // from JWT


    try {
        const user = await User.findById(userId);
        const plan = await Plan.findById(planId);

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!plan || plan.price === 0)
            return res.status(400).json({ message: 'Invalid or free plan' });

        const invoiceNumber = `INV-${uuidv4()}`; // generate unique invoice ID

        // Create payment record with status "pending"
        const payment = await Payment.create({
            user: user._id,
            plan: plan._id,
            amount: plan.price,
            invoiceNumber,
            status: 'pending',
        });

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: plan.name,
                            description: plan.description || '',
                        },
                        unit_amount: plan.price * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user._id.toString(),
                planId: plan._id.toString(),
                paymentId: payment._id.toString(),
            },
            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
        });

        res.status(200).json({ sessionUrl: session.url });
    } catch (error) {
        console.error('Payment initiation failed:', error);
        res.status(500).json({ message: 'Failed to initiate payment' });
    }
};
