import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import conf from './conf';

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// import { setPosts, setLoading, setError } from './Redux/postSlice';
// import postService from './database/property';
// for user login if user refresh website and also when purchase plan it refresh website on success
// import AuthService from './database/auth'
// import { login, logout, setUsers } from './Redux/authSlice'

// A thunk is a special kind of Redux action — it's not an object like { type: "ADD_POST" }, but a function that returns another function.
// Redux by default does not allow functions as actions. That’s where redux-thunk middleware comes in.
// Component
//   ↓
// dispatch(fetchPostsThunk()) -> This will detech if object then it will dispatch the action else if function then it will pass the function to thunk middleware
//   ↓
// Thunk middleware detects it's a function
//   ↓
// Runs: (dispatch, getState) => { ... }
//   ↓
// Makes API call
//   ↓
// Dispatches success/failure actions
//   ↓
// Reducers update the state
//   ↓
// Component re-renders

import { fetchAllPosts } from './Redux/thunks/fetchAllPosts';
import { fetchCurrentUser } from './Redux/thunks/fetchCurrentUser';
import { fetchAllUsers } from './Redux/thunks/fetchAllUsers';


import { GoogleOAuthProvider } from "@react-oauth/google";

const AppLayout = () => {

  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.posts);
  // this useEffect will login user on mount from cookie
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchAllUsers());
    if (!posts.length && !loading) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch]);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const res = await AuthService.getCurrentUser();
  //       dispatch(login({ userData: res }));
  //     } catch (err) {
  //       // Not logged in or invalid token
  //       dispatch(logout());
  //     }
  //   };

  //   checkUser();
  // }, [])

  // // this useEffect will fetch all users on mount
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await AuthService.getAllUsers();
  //       console.log("AppLayout :: fetchUsers :: res", res);
  //       dispatch(setUsers({ users: res }));
  //     } catch (err) {
  //       console.error("Error fetching users:", err);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     dispatch(setLoading(true));
  //     try {
  //       const data = await postService.getAllPosts();
  //       dispatch(setPosts(data));
  //     } catch (error) {
  //       dispatch(setError(error.message || "Something went wrong"));
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   };
  //   if (!posts.length && !loading) {
  //     fetchPosts();
  //   }
  // }, [posts.length]);

  return (
    <GoogleOAuthProvider clientId={conf.googleClientId}>
      <Header />
      <Outlet />
      <Footer />
    </GoogleOAuthProvider>
  );
};

export default AppLayout;