import { configureStore } from '@reduxjs/toolkit';
import createCommentSlice from './slices/CreateCommentSlice';
import WritePostSlice from './slices/WritePostSlice';
import ChatSlice from './slices/ChatSlice';
import CheckboxSlice from './slices/checkboxSlice';
import { apiSlice } from '@store/api/apiSlice';
import coordinateSetupSlice from './slices/coordinateSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    createComment: createCommentSlice,
    WritePost: WritePostSlice,
    chat: ChatSlice,
    checkbox: CheckboxSlice,
    coordinateSetup: coordinateSetupSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: import.meta.env.DEV,
});
