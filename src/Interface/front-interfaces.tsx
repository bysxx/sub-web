export interface INewsProps {
  _id: string;
  title: string;
  description: string;
  writer: string;
  time: string /* 백엔드에서 안옴 */;
}

export interface IStockProps {
  _id: string;
  price: number;
  value: number;
  name: string;
  description: string; // 우리가 쓰나?
  changeRate: number; // 백엔드에서 오는 이름은 rate
  valuePerRate: number;
  imageURL: string; // 백엔드에서 안옴
}

export interface IRankProps {
  userId: string;
  username: string;
  rank: number;
  howmuch: number;
}

export interface IUserProps {
  _id: string;
  nickname: string;
  profileImg: string;
  roomId: string;
  rank: number;
  balance: number;
}
