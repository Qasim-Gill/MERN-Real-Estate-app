import axios from 'axios';
import store from "../Redux/store";
import { login, logout } from '../Redux/authSlice';
import conf from '../conf';

export class AuthService {

    constructor() {
        this.baseUrl = conf.apiUrl;
        this.apiKey = conf.apiKey;
        this.currentUser = null;

        this.apiClient = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true
            // headers: {
            //     'Content-Type': 'application/json',
            //     'API-Key': this.apiKey
            // }
        });
    }

    async createAccount({ email, password, fullname, image }) {
        try {
            // Check if user already exists but now createuser function in backend will handle this
            // const existing = await this.apiClient.get(`/users?email=${email}`);
            // if (existing.data.length > 0) {
            //     throw new Error("User already exists");
            // }

            // Create new user
            // json-server creates id automatically it add +1 to the last id but now i am using mongoDB
            // so we don't need to pass id in the request body
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("fullname", fullname);

            // Only append image if it exists
            if (image) {
                formData.append("image", image); // 'image' is likely a File object
            }

            const response = await this.apiClient.post(`/api/users/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Axios will set correct boundary
                }
            });
            console.log("AuthService :: createAccount :: response", response.data);
            this.login({ email, password }); // Automatically log in after account creation
            return response.data;

            //this.currentUser = response.data;
            //this.login({ email, password }); // Automatically log in after account creation
            //return this.currentUser;

        } catch (error) {
            // const errorMsg = error?.response?.data?.message || "Something went wrong";
            console.error("AuthService :: createAccount :: error", errorMsg);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const response = await this.apiClient.post(`/api/users/login`, {
                email,
                password
            });
            // console.log("AuthService :: login :: response", response);
            // console.log("AuthService :: login :: response", response.data)
            // console.log("AuthService :: login :: response", response.data.user)
            // console.log("AuthService :: login :: response", document.cookie); // Should show your token
            if (!response.data.user) {
                throw new Error("Invalid email or password");
            }
            this.currentUser = response.data.user;
            console.log("AuthService :: login :: currentUser", this.currentUser);

            store.dispatch(login({ userData: this.currentUser }));
            return response.data;
        } catch (error) {
            const errorMsg = error?.response?.data?.message;
            if (errorMsg) {
                console.error("AuthService :: login :: error", errorMsg);
                throw new Error(errorMsg);
            }
            // console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
 
            const response = await this.apiClient.get(`/api/users/me`);

            if (!response.data) {
                throw new Error("User not found");
            }

            return response.data;

        } catch (error) {
            const errorMsg = error?.response?.data?.message;
            if (errorMsg) {
                console.error("AuthService :: getCurrentUser :: error", errorMsg);
                throw new Error(errorMsg);
            }
            // console.error("AuthService :: getCurrentUser :: error", error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
 
            const response = await this.apiClient.get(`/api/users/getAll`);
            // console.log("AuthService :: getAllUsers :: response", response.data);
            // console.log("AuthService :: getAllUsers :: response", response.data.count);
            // console.log("AuthService :: getAllUsers :: response", response.data.data);

            if (!response.data.success) {
                throw new Error("Something went wrong while fetching users");
            }

            if (!response.data.data || response.data.count === 0) {
                throw new Error("No users found");
            }
            
            return response.data.data;

        } catch (error) {
            const errorMsg = error?.response?.data?.message;
            if (errorMsg) {
                console.error("AuthService :: getAllUsers :: error", errorMsg);
                throw new Error(errorMsg);
            }
            // console.error("AuthService :: getAllUsers :: error", error);
            throw error;
        }
    }

    async logout() {
        try {
            // Send request to logout endpoint
            const response = await this.apiClient.post('/api/users/logout', {}, {
                // It will automatically send the cookie if the server is configured to set it
                // Note: Ensure your server is set up to handle CORS and cookies properly
                // No need to get cookie manually, axios will handle it
                withCredentials: true,  // Ensures the cookie token is sent
            });
            console.log("Logout response:", response.data);

            this.currentUser = null;

            // Call the logout action from Redux store (ensure it doesn't conflict with the variable name)
            store.dispatch(logout()); // Make sure 'logout' is the imported Redux action

            return true;
        } catch (error) {
            const errorMsg = error?.response?.data?.message;
            if (errorMsg) {
                console.error("AuthService :: logout :: error", errorMsg);
                throw new Error(errorMsg);
            }
            // console.error("AuthService :: logout :: error", error);
            return false;
        }
    }

}

const authService = new AuthService();
export default authService;


// Usage examples (uncomment to use):
// import authService from './path/to/authService';
// Registration
// const newUser = await authService.createAccount({
//     email: 'user@example.com',
//     password: 'securepass123',
//     company: 'Example Corp'
// });

// Login
// const loggedInUser = await authService.login({
//     email: 'user@example.com',
//     password: 'securepass123'
// });

// Get current user
// const currentUser = authService.getCurrentUser();

// Logout
// authService.logout();