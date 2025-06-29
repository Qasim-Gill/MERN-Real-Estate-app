import { useState, useEffect } from 'react';
import conf from '../../conf.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PlansPage() {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch plans from API
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${conf.apiUrl}/api/plans`);

                if (!response.statusText == 'Ok') {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // no neeed to convert response.data to JSON as axios does it automatically
                setPlans(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const choosePlan = async (planId) => {
        try {
            const response = await axios.post(
                `${conf.apiUrl}/api/users/select-plan`,
                { planId },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Include cookies in the request
                }
            );

            console.log("Plan selected in Plans.jsx :", response.data);
            // if plan is free, redirect to home
            navigate(response.data.nextStep)

        } catch (error) {
            console.error("Error choosing plan:", error.response?.data || error.message);
            setError("Failed to choose plan. Please try again.");
        }
    };


    // Function to render feature list for each plan
    const renderFeatures = (plan) => {
        return (
            <ul className="list-unstyled">
                <li className="mb-2">
                    {plan.canBrowse ? (
                        <span className="text-success">✓</span>
                    ) : (
                        <span className="text-danger">✗</span>
                    )}{' '}
                    Browse listings
                </li>
                <li className="mb-2">
                    {plan.canPost ? (
                        <span className="text-success">✓</span>
                    ) : (
                        <span className="text-danger">✗</span>
                    )}{' '}
                    {plan.postLimit > 0 ? `Post listings (${plan.postLimit} max)` : "Post listings"}
                </li>
                <li className="mb-2">
                    {plan.canFeature ? (
                        <span className="text-success">✓</span>
                    ) : (
                        <span className="text-danger">✗</span>
                    )}{' '}
                    Feature listings
                </li>
                <li className="mb-2">
                    {plan.canComment ? (
                        <span className="text-success">✓</span>
                    ) : (
                        <span className="text-danger">✗</span>
                    )}{' '}
                    Comment on listings
                </li>
            </ul>
        );
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h3 className="mt-3">Loading plans...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    Error loading plans: {error}
                </div>
                {/* <button
                    className="btn btn-primary mt-3"
                    onClick={() => fetchPlans()}
                >
                    Retry
                </button> */}
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Page header */}
            <div className="text-center mb-5">
                <h1 className="mb-3">Membership Plans</h1>
                <p className="lead text-muted">Choose the plan that fits your needs</p>
            </div>

            {/* Plans grid */}
            <div className="row g-4">
                {plans.length > 0 ? (
                    plans.map((plan) => (
                        <div key={plan._id} className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body d-flex flex-column">
                                    {/* Plan name and price */}
                                    <h2 className="card-title">{plan.name}</h2>
                                    <h3 className="mb-3">
                                        ${plan.price}
                                        <small className="text-muted fs-6">
                                            /{plan.durationDays === 7 ? 'week' : plan.durationDays === 30 ? 'month' : 'year'}
                                        </small>
                                    </h3>

                                    {/* Applicable to badges */}
                                    <div className="mb-3">
                                        {plan.applicableTo.map((type) => (
                                            <span key={type} className="badge bg-secondary me-1 mb-1">
                                                {type}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Plan description */}
                                    <p className="card-text text-muted mb-4">{plan.description}</p>

                                    <hr className="my-3" />

                                    {/* Features list */}
                                    {renderFeatures(plan)}

                                    {/* Action button */}
                                    <div className="mt-auto pt-3 text-center">
                                        {plan.price === 0 ? (
                                            <button className="btn btn-primary btn-lg w-100" onClick={() => choosePlan(plan._id)}>
                                                Get Started
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary btn-lg w-100" onClick={() => choosePlan(plan._id)}>
                                                Subscribe Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="text-center py-4">
                            <h3>No plans available</h3>
                        </div>
                    </div>
                )}
            </div>

            {/* Additional information */}
            <div className="text-center mt-5 pt-5">
                <h3 className="mb-3">Need help choosing a plan?</h3>
                <p className="text-muted mb-4">
                    Contact our support team to discuss which plan is right for you.
                </p>
                <button className="btn btn-outline-primary btn-lg">
                    Contact Support
                </button>
            </div>
        </div>
    );
}

export default PlansPage;