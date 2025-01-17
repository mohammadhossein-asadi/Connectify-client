import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  isPublicView: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isPublicView = false;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isPublicView = true;
    },
    setFriends: (state, action) => {
      state.user
        ? (state.user.friends = action.payload.friends)
        : console.error("user friends non-existent :(");
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPublicView: (state, action) => {
      state.isPublicView = action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setPublicView,
} = authSlice.actions;
export default authSlice.reducer;
