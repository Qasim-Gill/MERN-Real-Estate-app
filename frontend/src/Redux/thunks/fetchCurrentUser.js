// Redux/thunks/fetchCurrentUser.js
import authService from "../../database/auth";
import { login, logout } from "../authSlice";
// here dispatch is automatically passed by Redux Thunk middleware
// when we install redux-toolkit, it includes thunk middleware by default
// import { configureStore } from "@reduxjs/toolkit"; in configureStore
// it automatically applies thunk middleware, so we don't need to do it manually
// This thunk fetches the current user and dispatches login or logout actions accordingly
// In app.jsx when i didn't use thunk, the code was messy and hard to read
// Now with thunk, the code is cleaner and easier to understand

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const user = await authService.getCurrentUser();
    if (!user) {
      // If no user is found, dispatch logout
      dispatch(logout());
      return;
    }
    // console.log("Current user fetched:", user);
    dispatch(login({ userData: user }));
  } catch (err) {
    // dispatch(logout());
    console.error("Error fetching current user:", err);
  }
};
