import {
  LoginResponse,
  NewUserResponse,
  OAuthServiceType,
  IRegisterRequest,
} from '@/types/AuthTypes';
import { apiSlice } from '@store/api/apiSlice';
import { tokenStorage } from '@utils/tokenStorage';

const HTTP_STATUS_OK = 200;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse | NewUserResponse,
      { serviceName: OAuthServiceType; code: string }
    >({
      query: ({ serviceName, code }) => ({
        url: `users/login/${serviceName}?authorizationCode=${code}&env=${
          import.meta.env.DEV ? 'dev' : 'prod'
        }${serviceName === 'naver' ? '&state=true' : ''}`,
        method: 'POST',
      }),
      transformResponse: (
        response: LoginResponse | NewUserResponse,
        meta: { response: Response }
      ) => {
        if (meta.response.status === HTTP_STATUS_OK) {
          if (response.message.includes('신규 회원')) {
            return response;
          }
          const { accessToken, refreshToken } =
            response.data as LoginResponse['data'];
          tokenStorage.setTokens({ accessToken, refreshToken });
          return response;
        }

        throw new Error(`Unexpected response status: ${meta.response.status}`);
      },
    }),
    signUp: builder.mutation<LoginResponse, IRegisterRequest>({
      query: (body) => ({
        url: 'users/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: LoginResponse) => {
        const { accessToken, refreshToken } = response.data;
        tokenStorage.setTokens({ accessToken, refreshToken });
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApiSlice;
