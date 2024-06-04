import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../service/supabase';

const initialState = {
  userInfo: {
    user: {
      id: '',
      email: '',
      avatar_url: '',
      username: ''
    },
    token: {
      access_token: '',
      token_type: 'bearer',
      expires_in: 0,
      expires_at: 0,
      refresh_token: ''
    },
    isLoggedIn: false
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const {
        userInfo: { access_token, token_type, expires_in, expires_at, refresh_token, user }
      } = action.payload;

      const newToken = {
        access_token,
        token_type,
        expires_in,
        expires_at,
        refresh_token
      };
      const newUser = {
        id: user.id,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url,
        username: user.user_metadata.username
      };
      // console.log('NEW TOKEN', newToken);
      // console.log('NEW USER', newUser);
      state.userInfo.user = newUser;
      state.userInfo.token = newToken;
      state.userInfo.isLoggedIn = true;
    },
    clearUser(state) {
      state.userInfo = initialState;
    },
    updateUserInfo(state, action) {
      state.userInfo.user.username = action.payload.user.user_metadata.username;
    }
  }
});

export const { setUser, clearUser, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
