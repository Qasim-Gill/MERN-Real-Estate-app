import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import conf from '../../conf';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../Redux/thunks/fetchCurrentUser';
import { fetchAllUsers } from '../../Redux/thunks/fetchAllUsers';

// if user completed the payment, show this page
// controllers/confirmPlanPayment.js on backend will redirect to this page if payment is successful
// that function automatically add session_id to the URL and we extract it here to verify the payment

function PaymentSuccess() {
    const [message, setMessage] = useState('Verifying your payment...');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const verifyPayment = async () => {
            const sessionId = new URLSearchParams(window.location.search).get('session_id');

            if (!sessionId) {
                setMessage('Invalid payment session.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${conf.apiUrl}/api/users/verify-payment`,
                    { sessionId },
                    { withCredentials: true }
                );

                setMessage(response.data.message);
                // Optionally, you can dispatch actions to update the user state
                // after successful payment verification
                // because when user completes the payment, we want to update their plan
                // and also fetch the current user and all users again
                dispatch(fetchCurrentUser());
                // here is room for improvemnt, i can just simply make another function in auth.js to update user category
                // so i don't have to fetch all users again
                // but for now i will fetch all users again
                // this is because i want to show the updated user list in the users page
                dispatch(fetchAllUsers());

            } catch (err) {
                console.error('Verification failed:', err.response?.data || err.message);
                setMessage('Payment verification failed. Please contact support.');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, []);

    // Optional: Auto-redirect after 7 seconds
    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                navigate('/'); // or wherever you want
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, [loading, navigate]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Payment Status</h1>
            <p>{message}</p>
            {!loading && <p>Redirecting you shortly...</p>}
        </div>
    );
}

export default PaymentSuccess;
