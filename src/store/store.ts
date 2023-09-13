import { configureStore } from '@reduxjs/toolkit';
import createCommentSlice from './slices/CreateCommentSlice';
import WritePostSlice from './slices/WritePostSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    createComment: createCommentSlice, 
    WritePost :WritePostSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: import.meta.env.DEV,
});