import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';

const fetch_url = 'https://jsonplaceholder.typicode.com';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: SerializedError;
}

const initialState = {
  posts: [],
  isLoading: false,
  error: '',
} as PostsState;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', () => {
  return fetch(`${fetch_url}/posts?_limit=20`)
    .then((res) => res.json())
    .catch((err) => err.message);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { deletePost } = postsSlice.actions;

export default postsSlice.reducer;
