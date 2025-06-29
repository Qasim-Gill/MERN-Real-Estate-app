import axios from "axios";
import conf from "../../conf";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerifyEmail() {
    const serverEndPoint = conf.baseUrl;
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying...");
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(null);

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await axios.post(`${serverEndPoint}/api/auth/verify-email`, { token });
                setStatus("✅ Email verified successfully!");
                setIsSuccess(true);
            } catch (error) {
                console.error(error);
                setStatus("❌ Verification failed. Please try again.");
                setIsSuccess(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            verify();
        } else {
            setStatus("❌ Invalid token.");
            setIsSuccess(false);
            setIsLoading(false);
        }
    }, [token, serverEndPoint]);

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card text-center shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h4 className="mb-3">Email Verification</h4>

                {isLoading ? (
                    <>
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted">{status}</p>
                    </>
                ) : (
                    <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;
