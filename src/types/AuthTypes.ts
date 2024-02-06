export type OAuthServiceType =
  | 'GOOGLE'
  | 'NAVER'
  | 'KAKAO'
  | 'google'
  | 'naver'
  | 'kakao';

export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface INewUser {
  authId: string;
  authType: OAuthServiceType;
  nickname: string;
  profileImage: string;
}

export interface IRegisterRequest {
  authId: string;
  authType: OAuthServiceType;
  nickname: string;
  profileImage: string;
  addressRequest: {
    regionCode: string;
    type: string;
  };
}

export type LoginResponse = IResponse<ITokens>;
export type TokensResponse = IResponse<string>;
export type NewUserResponse = IResponse<INewUser>;
