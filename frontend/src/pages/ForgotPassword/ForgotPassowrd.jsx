import { useState } from "react";
import axios from "axios";
import conf from "../../conf.js";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage({ type: "danger", text: "Please enter your email." });
            setShowAlert(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${conf.apiUrl}/api/auth/forgot-password`,
                { email }
            );
            setMessage({
                type: "success",
                text: "If the email exists, a reset link has been sent.",
            });
        } catch (error) {
            setMessage({
                type: "danger",
                text:
                    error.response?.data?.message ||
                    "Failed to send reset link. Please try again.",
            });
        } finally {
            setShowAlert(true);
            setLoading(false);
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: "500px" }}>
            <h3 className="mb-4 text-center">Forgot Password</h3>

            {showAlert && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                    {message.text}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowAlert(false)}
                    ></button>
                </div>
            )}

            <form onSubmit={handleForgotPassword}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="emailInput"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;
