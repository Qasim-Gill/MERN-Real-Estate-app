import { useState } from 'react';
import axios from 'axios';
import conf from '../../conf.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../Redux/thunks/fetchCurrentUser';
import { fetchAllUsers } from '../../Redux/thunks/fetchAllUsers';

function SelectCategory() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category) {
            setMessage({ type: 'danger', text: 'Please select a category.' });
            return;
        }

        try {
            const response = await axios.post(
                `${conf.apiUrl}/api/users/select-category`,
                { category },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            setMessage({ type: 'success', text: response.data.message });
            // Optionally, you can dispatch actions to update the user state
            // after successfuly selecting a category
            // because when user selects a category, we want to update their category
            dispatch(fetchCurrentUser());
            // here is room for improvemnt, i can just simply make another function in auth.js to update user category
            // so i don't have to fetch all users again
            // but for now i will fetch all users again
            // this is because i want to show the updated user list in the users page
            dispatch(fetchAllUsers());
            navigate(response.data.nextStep || '/'); // Redirect to next step or home

        } catch (error) {
            const errMsg = error.response?.data?.message || 'Something went wrong.';
            setMessage({ type: 'danger', text: errMsg });
        }
    };

    return (
        <div className="container my-5">
            <h4>Select Your Category</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select one</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                        <option value="Agent">Agent</option>
                        <option value="Builder">Builder</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {message && (
                <div className={`alert alert-${message.type} mt-3`} role="alert">
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default SelectCategory;
