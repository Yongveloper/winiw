import { IResponse } from './AuthTypes';

export type GradeType = 'one' | 'two' | 'three' | 'four' | null;

interface IAddress {
  bdongName: string;
  eupMyeon: string | null;
  guGunSi: string;
  hdongCode: string;
  hdongName: string;
  id: number;
  ri: string | null;
  siDo: string;
}

export interface IUser {
  id: string;
  nickname: string;
  grade: GradeType;
  profileImage: string;
  address: IAddress;
}

export type UserResponse = IResponse<IUser>;
