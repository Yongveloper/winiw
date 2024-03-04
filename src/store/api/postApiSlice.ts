import { IPost } from '@/types/PostTypes';
import { apiSlice } from './apiSlice';

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostDetail: builder.query<IPost, string>({
      query: (id) => `/v1/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const { useGetPostDetailQuery, useDeletePostMutation } = postApiSlice;
