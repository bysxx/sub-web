export interface IStockLog {
  price: number;
  value: number;
  date: Date;
}

export interface IStock {
  price: number;
  value: number;
  name: string;
  description: string;
  rate: number;
  valuePerRate: number;
  logs: IStockLog[];
}
