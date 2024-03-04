import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { tokenStorage } from '@utils/tokenStorage';
import { TokensResponse } from '@/types/AuthTypes';

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL + '/api',
  prepareHeaders: (headers) => {
    const accessToken = tokenStorage.getAccessToken();

    // Access Token이 있으면 API 호출 시 Header에 추가
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithIntercept: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // Access Token이 만료되었을 경우

  if (result.error && result.error.status === 401) {
    tokenStorage.removeAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();
    // Refresh Token으로 새로운 Access Token을 발급받음
    const refreshResult = await baseQuery(
      {
        url: '/oauth/token',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions
    );

    // 정상적으로 새로운 Access Token을 발급받았을 경우
    if (refreshResult?.data) {
      const newAccessToken = (refreshResult.data as TokensResponse).data.split(
        ' '
      )[1];
      tokenStorage.setAccessToken(newAccessToken);
      // 새로운 Access Token으로 다시 기존 API 호출
      result = await baseQuery(args, api, extraOptions);
    } else {
      tokenStorage.clearTokens();
      alert(
        '다시 로그인해주세요. (토큰 만료) status:' +
          refreshResult.meta.response.status
      );
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithIntercept,
  tagTypes: ['User', 'Post'],
  endpoints: () => ({}),
});
