export interface IStockLog {
  price: number;
  date: Date;
}

export interface IStock {
  price: number;
  name: string;
  description: string;
  rate: number;
  logs: IStockLog[];
}
