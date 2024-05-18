export interface IHint {
  userId: string;
  title: string;
  description: string;
}

export interface ISetting {
  maxUser: number;
  endDate: Date;
  startBalance: number;
}

export interface IRoom {
  num: number;
  name: string;
  adminId: string;
  userIds: string[];
  stockIds: string[];
  hints: IHint[];
  setting: ISetting;
}
