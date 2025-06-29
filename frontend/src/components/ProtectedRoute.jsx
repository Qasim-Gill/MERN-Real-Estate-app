// # TODO: add auth methods in store 
import { Navigate, useLocation } from 'react-router-dom';
import store from "../Redux/store";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.status)
    // console.log("ProtectedRoute :: isAuthenticated", isAuthenticated)
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // console.log("ProtectedRoute :: children", children)
    // If the user is authenticated, return the children components
    return children;
};

export default ProtectedRoute;