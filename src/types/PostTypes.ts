import { IUser } from './UserTypes';

export const POST_TYPE = {
  GOODS: 'GOODS',
  TALENT: 'TALENT',
} as const;

export const TRADE_TYPE = {
  SINGLE_TRADE: 'SINGLE_TRADE',
  OFFER: 'OFFER',
} as const;

export const TRADE_TIME = {
  EARLY_MORNING: 'EARLY_MORNING',
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  EVENING: 'EVENING',
};

type PostType = (typeof POST_TYPE)[keyof typeof POST_TYPE];
type TradeType = (typeof TRADE_TYPE)[keyof typeof TRADE_TYPE];
export type TradeTimeType = (typeof TRADE_TIME)[keyof typeof TRADE_TIME];

export interface IImage {
  id: number;
  imageUrl: string;
  createdAt: string;
  modifiedAt: string;
}

interface IPostAddress {
  region1: string;
  region2: string;
  region3: string;
  latitude: number;
  longitude: number;
}

export interface IPost {
  id: number;
  writer: IUser;
  title: string;
  content: string;
  images: IImage[];
  postType: PostType;
  tradeType: TradeType;
  provisionCategory: string;
  wishCategory: string;
  suggestedPrice: number[];
  address: IPostAddress;
  closeAt: string;
  createdAt: string;
  modifiedAt: string;
  tradeTime: TradeTimeType;
}
