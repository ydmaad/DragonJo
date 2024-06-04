import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    user: {
      id: '',
      email: '',
      avatar_url: '',
      user_name: ''
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
        userInfo: { session, user }
      } = action.payload;
      const newToken = {
        access_token: session.access_token,
        token_type: session.token_type,
        expires_in: session.expires_in,
        expires_at: session.expires_at,
        refresh_token: session.refresh_token
      };
      const newUser = {
        id: user.id,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url,
        user_name: user.user_metadata.user_name
      };
      // console.log('NEW TOKEN', newToken);
      // console.log('NEW USER', newUser);
      state.userInfo.user = newUser;
      state.userInfo.token = newToken;
      state.userInfo.isLoggedIn = true;
    },
    clearUser(state) {
      state.userInfo = initialState;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
