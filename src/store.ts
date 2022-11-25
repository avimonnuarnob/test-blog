import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import postsReducer from './services/postsSlice';
import postReducer from './services/postSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
  },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export type RootState = ReturnType<typeof store.getState>;
