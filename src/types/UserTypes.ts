import { IAddressRequest, IResponse } from './AuthTypes';

export type GradeType = 'one' | 'two' | 'three' | 'four' | null;

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

interface IAddress {
  bdongName: string;
  eupMyeon: string | null;
  guGunSi: string;
  hdongCode: string;
  hdongName: string;
  id: number;
  ri: string | null;
  siDo: string;
  latitude: number;
  longitude: number;
}

export interface IUser {
  id: string;
  nickname: string;
  grade: GradeType;
  profileImage: string;
  address: IAddress;
}

export interface IUpdateUser {
  request: {
    nickname?: string;
    addressRequest: IAddressRequest;
  };
  file?: File | null;
}

export type UserResponse = IResponse<IUser>;
