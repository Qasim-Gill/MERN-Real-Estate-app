import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'; // Import reducer
import postReducer from './postSlice';

const store = configureStore({
  reducer: {
    auth: authSlice, // Add reducer
    posts: postReducer, // Add posts reducer
  },
});

export default store;