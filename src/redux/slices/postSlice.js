import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../service/supabase';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await supabase.from('posts').select('*').order('id', { ascending: false });
  return data;
});

export const createPost = createAsyncThunk('posts/createPost', async ({ title, content, imageURL, name }) => {
  const { data } = await supabase.from('posts').insert({ title, content, images: imageURL, name }).select();
  return data[0];
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const { data } = await supabase.from('posts').delete().eq('id', id).select();
  return data[0];
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content, imageURL }) => {
  const { data } = await supabase.from('posts').update({ title, content, images: imageURL }).eq('id', id).select();
  return data[0];
});

export const updatePostUserName = createAsyncThunk('posts/updatePostUserName', async ({ id: user_id, name }) => {
  const data = await supabase.from('posts').update({ name }).eq('user_id', user_id).select();
  return data;
});

export const updateCommentUserName = createAsyncThunk(
  'comments/updateCommentUserName',
  async ({ id: user_id, name: writer }) => {
    const data = await supabase.from('comments').update({ writer }).eq('user_id', String(user_id)).select();
    return data;
  }
);

export const likePost = createAsyncThunk('posts/likePost', async ({ userId, postId }) => {
  const { data, error } = await supabase.rpc('toggle_like', { p_user_id: userId, p_post_id: postId });

  if (error) {
    throw new Error(error.message);
  }

  return { id: postId, likes: data[0].likes_count, liked: data[0].liked };
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
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePostUserName.fulfilled, (state, action) => {
        const data = action.payload;
        state.posts.forEach((post) => {
          data.data.forEach((data, idx) => {
            if (data.id === post.id) {
              state.posts[idx].name = data.name;
            }
          });
        });
      })
      .addCase(updateCommentUserName.fulfilled, (state, action) => {})
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.user_id === action.payload.id);
        if (index !== -1) {
          state.posts[index].likes = action.payload.likes;
        }
      });
  }
});

export default postsSlice.reducer;
