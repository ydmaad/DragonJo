import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../service/supabase';

const initialState = {
  userInfo: {
    isLoggedIn: false,
    session: {
      access_token: '',
      token_type: 'bearer',
      expires_in: 0,
      expires_at: 0,
      refresh_token: '',
      user: {
        id: '',
        email: '',
        avatar_url: '',
        user_name: ''
      }
    }
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { session } = action.payload;
      // console.log('USER.SLICE', session);
      state.userInfo.session = session;
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
