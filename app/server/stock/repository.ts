import dbConnect from 'app/server/db-connect';

import type { IStock } from './interfaces';
import Stock from './model';

export const createStock = async (stock: IStock) => {
  await dbConnect();
  return Stock.create(stock);
};

export const getStock = async () => {
  await dbConnect();
  const data = await Stock.find({});

  return data;
};

export const findStockDetailById = async (id: string) => {
  await dbConnect();
  return Stock.findOne({ _id: id });
};

export const updateStock = async (stockId: string, newPrice: number) => {
  await dbConnect();
  const stock = await findStockDetailById(stockId);
  if (!stock) throw Error('Stock not found');
  const oldPrice = stock.price;
  const log: IStockLog = {
    price: newPrice,
    date: new Date(),
  };
  stock.price = newPrice;
  stock.logs.push(log);
  stock.rate = (newPrice - oldPrice) / oldPrice;
  await stock.save();
};

export const deleteStock = async (id: string) => {
  await dbConnect();
  await Stock.findByIdAndDelete(id);
};

export const addLogToStock = async (stockId: string, log: IStockLog) => {
  await dbConnect();
  return Stock.findByIdAndUpdate(stockId, { $push: { logs: log } }, { new: true });
};

export const getLogByStock = async (stockId: string) => {
  await dbConnect();
  const stock = await findStockDetailById(stockId);
  if (!stock) throw Error('Stock not found');
  return stock?.logs;
};
