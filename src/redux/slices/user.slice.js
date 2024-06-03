import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

      state.user = newUser;
      state.token = newToken;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
