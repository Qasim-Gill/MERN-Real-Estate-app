import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// if user cancelled the payment, show this page
// if user cancel the payment on Stripe, they will be redirected to this page
// if user doesn't have balance, they will be redirected to this page
// controllers/confirmPlanPayment.js on backend will redirect to this page if payment is cancelled

function PaymentCancelled() {
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically redirect after a few seconds (optional)
        const timer = setTimeout(() => {
            navigate('/'); // Change to a different route if needed
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Payment Cancelled</h1>
            <p>Your payment was not completed.</p>
            <p>If this was a mistake, you can try again from your plan page.</p>
            <p>You will be redirected shortly...</p>
        </div>
    );
}

export default PaymentCancelled;
