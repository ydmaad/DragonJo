import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    isLoggedIn: false,
    user: {
      id: '',
      email: '',
      avatar_url: '',
      name: ''
    }
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { session } = action.payload;
      const { user } = session;
      // console.log('USER.SLICE SESSION', session);
      // console.log('USER.SLICE USER', user.id);

      const newUser = {
        id: user.id,
        email: user.email,
        name: user.user_metadata.name,
        avatar_url: user.user_metadata.avatar_url
      };
      // console.log('USER.SLICE newUser', newUser);
      state.userInfo.user = newUser;
      state.userInfo.isLoggedIn = true;
    },
    clearUser(state) {
      state.userInfo = initialState;
    },
    updateUserInfo(state, action) {
      state.userInfo.user.name = action.payload.user.user_metadata.name;
    },
    uploadUserAvatar(state, action) {
      const imgURL = action.payload.user.user_metadata.avatar_url;
      if (imgURL !== '') {
        state.userInfo.user.avatar_url = imgURL;
      }
    }
  }
});

export const { setUser, clearUser, updateUserInfo, uploadUserAvatar } = userSlice.actions;
export default userSlice.reducer;
