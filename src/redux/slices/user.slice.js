import { createSlice } from '@reduxjs/toolkit';

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
      if (session.user.app_metadata.provider !== 'email') {
        // github, google 로그인 시
        state.userInfo.session.user.user_metadata.user_name = session.user.user_metadata.name;
      }
      state.userInfo.isLoggedIn = true;
    },
    clearUser(state) {
      state.userInfo = initialState;
    },
    updateUserInfo(state, action) {
      state.userInfo.session.user.user_metadata.user_name = action.payload.user.user_metadata.user_name;
    },
    uploadUserAvatar(state, action) {
      console.log(action.payload);
      state.userInfo.session.user.user_metadata.avatar_url = action.payload;
      console.log(state.userInfo.session.user.user_metadata.avatar_url)
    }
  }
});

export const { setUser, clearUser, updateUserInfo, uploadUserAvatar } = userSlice.actions;
export default userSlice.reducer;
