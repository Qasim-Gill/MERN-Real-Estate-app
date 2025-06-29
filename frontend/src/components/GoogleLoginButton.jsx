import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import conf from '../conf';
import { login } from "../Redux/authSlice"; // Adjust the import path as necessary
import { useDispatch } from 'react-redux';

function GoogleLoginButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(
                `${conf.baseUrl}/api/users/google`, // your backend route
                { credential: credentialResponse.credential },
                { withCredentials: true } // i learned new lesson that withCredentials is not only for sending cookies, but also for receiving them
            );
            console.log("Google login response:", res.data.user);
            const { nextStep } = res.data;
            dispatch(login({ userData: res.data.user })); // update Redux state
            navigate(nextStep); // redirect to the correct screen
        } catch (error) {
            console.error("Google login failed", error.response?.data || error.message);
            console.error("Error details:", error);
            alert(error.response?.data?.message || "Google login failed");
        }
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                    alert("Google Login Failed");
                }}
                useOneTap // optional: adds one-tap login
            />
        </div>
    );
}

export default GoogleLoginButton;
