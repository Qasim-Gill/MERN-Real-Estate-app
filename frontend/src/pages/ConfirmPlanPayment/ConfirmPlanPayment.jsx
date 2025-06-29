import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import conf from '../../conf.js';

const ConfirmPlanPayment = () => {
    const { planId } = useParams();
    const [plan, setPlan] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                const response = await axios.post(
                    `${conf.apiUrl}/api/plans`,
                    { planId },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );

                console.log("Plan details fetched in ConfirmPlanPayment.jsx:", response.data);
                setPlan(response.data); // Adjust depending on what backend sends
            } catch (error) {
                console.error("Error choosing plan:", error.response?.data || error.message);
                setError("Failed to load plan. Please try again.");
            }
        };

        fetchPlanDetails();
    }, [planId]);

    const handleStripePayment = async () => {
        try {
            const response = await axios.post(
                `${conf.apiUrl}/api/users/confirm-plan-payment`,
                { planId },
                { withCredentials: true }
            );
            window.location.href = response.data.sessionUrl; // Redirect to Stripe Checkout
        } catch (err) {
            console.error('Stripe error:', err);
            alert('Failed to start payment session.');
        }
    };

    if (error) return <p>{error}</p>;
    if (!plan) return <p>Loading plan details...</p>;

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h4 mb-0">Confirm Plan Payment</h2>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <h3 className="h5 text-primary">{plan.name}</h3>
                                <p className="text-muted">{plan.description}</p>
                                <div className="display-4 my-3 text-success">
                                    ${plan.price}
                                    <small className="text-muted d-block">one-time payment</small>
                                </div>
                            </div>

                            <div className="border-top pt-4">
                                <h4 className="h6 mb-3">Payment Method</h4>
                                <button
                                    onClick={handleStripePayment}
                                    className="btn btn-lg btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                                >
                                    <i className="bi bi-credit-card me-2"></i>
                                    Pay with Stripe
                                </button>
                            </div>
                        </div>
                        <div className="card-footer bg-light">
                            <small className="text-muted">
                                <i className="bi bi-lock-fill me-1"></i>
                                Your payment is secure and encrypted
                            </small>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ConfirmPlanPayment;
