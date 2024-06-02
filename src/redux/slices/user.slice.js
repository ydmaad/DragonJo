import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    id: '',
    email: '',
    user_metadata: {
      avatar_url: '',
      username: ''
    }
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload.userInfo;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
