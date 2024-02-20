import { IUpdateUser, UserResponse } from '@/types/UserTypes';
import { apiSlice } from './apiSlice';
import { IResponse } from '@/types/AuthTypes';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserResponse, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    updateUserInfo: builder.mutation<IResponse<object>, IUpdateUser>({
      query: (user) => {
        const formData = new FormData();
        formData.append(
          'request',
          new Blob([JSON.stringify(user.request)], { type: 'application/json' })
        );
        if (user.file) {
          formData.append('file', user.file);
        }
        return {
          url: '/users',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<IResponse<object>, void>({
      query: () => {
        return {
          url: '/users/sign-out',
          method: 'POST',
        };
      },
    }),
    deleteUser: builder.mutation<IResponse<object>, void>({
      query: () => {
        return {
          url: '/users',
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useLogoutMutation,
  useDeleteUserMutation,
} = userApiSlice;
