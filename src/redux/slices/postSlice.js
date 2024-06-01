import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../api/supabaseClient';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await supabase.from('posts').select();
  return data;
});

export const createPost = createAsyncThunk('posts/createPost', async ({ title, content }) => {
  const { data } = await supabase.from('posts').insert({ title, content }).select();
  return data[0];
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const { data } = await supabase.from('posts').delete().eq('id', id).select();
  return data[0];
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content }) => {
  const { data } = await supabase.from('posts').update({ title, content }).eq('id', id).select();
  return data[0];
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  }
});

export default postsSlice.reducer;
