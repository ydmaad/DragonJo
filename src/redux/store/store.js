import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../slices/postSlice';
import userSlice from '../slices/user.slice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userSlice
  }
});

export default store;
