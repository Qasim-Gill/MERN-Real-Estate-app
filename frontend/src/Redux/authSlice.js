import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    users: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        toggleFollow: (state, action) => {
            // i spent a lot of time on this function
            // it toggles the follow status of a user
            // i found out that if we update the nested state directly, it will not trigger a re-render
            // so we need to clone the state and update it
            const targetUserId = action.payload;
            const currentUserId = state.userData._id;

            // Clone following array safely
            const isAlreadyFollowing = state.userData.following.includes(targetUserId);
            const newFollowing = isAlreadyFollowing
                ? state.userData.following.filter(id => id !== targetUserId)
                : [...state.userData.following, targetUserId];

            state.userData = {
                ...state.userData,
                following: newFollowing,
            };

            // Update target user's followers in the users list
            state.users = state.users.map(user => {
                if (user._id === targetUserId) {
                    const isFollowed = user.followers.includes(currentUserId);
                    const newFollowers = isFollowed
                        ? user.followers.filter(id => id !== currentUserId)
                        : [...user.followers, currentUserId];

                    return {
                        ...user,
                        followers: newFollowers,
                    };
                }
                return user;
            });
        }
    }
})

export const { login, logout, setUsers, toggleFollow } = authSlice.actions;

export default authSlice.reducer;