export interface IUserStockAsset {
  stockId: string;
  count: number;
  average: number;
}

export interface IUser {
  nickname: string;
  roomId: string;
  stockAssets: IUserStockAsset[];
  balance: number;
}
