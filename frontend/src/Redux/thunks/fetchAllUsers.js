// Redux/thunks/fetchAllUsers.js
import authService from "../../database/auth";
import { setUsers } from "../authSlice";
// here dispatch is automatically passed by Redux Thunk middleware
// when we install redux-toolkit, it includes thunk middleware by default
// import { configureStore } from "@reduxjs/toolkit"; in configureStore
// it automatically applies thunk middleware, so we don't need to do it manually
// This thunk fetches the all users and dispatches setUsers action accordingly
// In app.jsx when i didn't use thunk, the code was messy and hard to read
// Now with thunk, the code is cleaner and easier to understand

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const users = await authService.getAllUsers();
    dispatch(setUsers({ users }));
  } catch (err) {
    console.error("Error fetching users:", err.message);
  }
};
