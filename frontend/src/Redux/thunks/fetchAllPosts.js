// Redux/thunks/fetchAllPosts.js
import postService from "../../database/property";
import { setPosts, setError, setLoading } from "../postSlice";
// here dispatch is automatically passed by Redux Thunk middleware
// when we install redux-toolkit, it includes thunk middleware by default
// import { configureStore } from "@reduxjs/toolkit"; in configureStore
// it automatically applies thunk middleware, so we don't need to do it manually
// This thunk fetches the current all posts and dispatches setPosts, setError, and setLoading actions accordingly
// This thunk is used to fetch all posts from the server and update the Redux store
// In app.jsx when i didn't use thunk, the code was messy and hard to read
// Now with thunk, the code is cleaner and easier to understand

export const fetchAllPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await postService.getAllPosts();
    dispatch(setPosts(data));
  } catch (err) {
    dispatch(setError(err.message || "Something went wrong"));
  } finally {
    dispatch(setLoading(false));
  }
};
