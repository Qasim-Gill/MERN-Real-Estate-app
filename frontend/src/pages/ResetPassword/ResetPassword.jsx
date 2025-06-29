import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../../conf.js";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Password validation
        if (!newPassword) {
            setMessage({ type: "danger", text: "Please enter a new password." });
            setShowAlert(true);
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: "danger", text: "Password must be at least 6 characters long." });
            setShowAlert(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${conf.apiUrl}/api/auth/reset-password`, {
                token,
                newPassword,
            });

            setMessage({ type: "success", text: "Password reset successfully!" });
            setShowAlert(true);

            setTimeout(() => {
                navigate("/login"); // Redirect after success
            }, 2000);
        } catch (error) {
            setMessage({
                type: "danger",
                text: error.response?.data?.message || "Reset failed. Token might be expired or invalid.",
            });
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: "500px" }}>
            <h3 className="mb-4 text-center">Reset Password</h3>

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

            <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        className="form-control"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                    <div className="form-text">Password must be at least 6 characters long.</div>
                </div>

                <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
