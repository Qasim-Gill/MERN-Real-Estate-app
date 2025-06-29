import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    filteredPosts: [], // store filtered results temporarily
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setFilteredPosts(state, action) {
            state.filteredPosts = action.payload;
        },
        resetFilteredPosts(state) {
            state.filteredPosts = [];
        },
        setPosts(state, action) {
            state.posts = action.payload;
        },
        addPost(state, action) {
            state.posts.push(action.payload);
        },
        updatePost(state, action) {
            const updatedPost = action.payload;
            const index = state.posts.findIndex(post => post.id === updatedPost.id);
            if (index !== -1) {
                state.posts[index] = updatedPost;
            }
        },
        deletePost(state, action) {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post._id !== postId);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        resetPosts(state) {
            state.posts = [];
            state.loading = false;
            state.error = null;
        },
        updatePostLikes: (state, action) => {
            const { postId, likes, dislikes } = action.payload;
            const postIndex = state.posts.findIndex(p => p._id === postId);
            if (postIndex !== -1) {
                state.posts[postIndex] = {
                    ...state.posts[postIndex],
                    likes: likes || [],
                    dislikes: dislikes || []
                };
            }
        }
    },
});

export const {
    setPosts,
    addPost,
    updatePost,
    deletePost,
    setLoading,
    setError,
    updatePostLikes,
    resetPosts,
    setFilteredPosts,
    resetFilteredPosts
} = postSlice.actions;

export default postSlice.reducer;
