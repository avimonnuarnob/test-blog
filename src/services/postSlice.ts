import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';

const fetch_url = 'https://jsonplaceholder.typicode.com';

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Author {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

interface Post {
  id?: number;
  userId?: number;
  title?: string;
  body?: string;
}

interface Comment {
  id?: number;
  userId?: number;
  name?: string;
  body?: string;
  email?: string;
}

interface PostState {
  post: Post;
  comments: Comment[];
  author: Author;
  isLoading: boolean;
  error: SerializedError;
}

const initialState = {
  post: {},
  comments: [],
  author: {},
  isLoading: false,
  error: '',
} as PostState;

export const fetchPostById = createAsyncThunk(
  'posts/fetchPost',
  (postId: string) => {
    return fetch(`${fetch_url}/posts/${postId}`)
      .then((res) => res.json())
      .catch((err) => err.message);
  },
);

export const fetchCommentsById = createAsyncThunk(
  'posts/fetchComments',
  (postId: string) => {
    return fetch(`${fetch_url}/posts/${postId}/comments`)
      .then((res) => res.json())
      .catch((err) => err.message);
  },
);

export const fetchAuthor = createAsyncThunk(
  'posts/fetchAuthor',
  (userId: number) => {
    console.log(userId);
    return fetch(`${fetch_url}/users/${userId}`)
      .then((res) => res.json())
      .catch((err) => err.message);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPostById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(fetchCommentsById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCommentsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchCommentsById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(fetchAuthor.pending, (state) => {
      console.log('called');
      state.isLoading = true;
    });
    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.author = action.payload;
    });
    builder.addCase(fetchAuthor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default postsSlice.reducer;
