import dbConnect from 'app/server/db-connect';

import type { IStock, IStockLog } from './interfaces';
import Stock from './model';

// stock 데이터 받아서 추가하기.
export const createStock = async (stock: IStock) => {
  await dbConnect();
  return Stock.create(stock);
};

// 생성된 모든 stock데이터 가져오기.
export const getStock = async () => {
  await dbConnect();
  const data = await Stock.find({});

  return data;
};

// id로 특정 stock데이터 가져오기.
export const findStockDetailById = async (id: string) => {
  await dbConnect();
  try {
    const data = await Stock.findOne({ _id: id });

    return data;
  } catch (error) {
    throw new Error('Stock dose not exist');
  }
};

export const updateStock = async (stockId: string, newStock: IStock) => {
  await dbConnect();
  try {
    const updatedStock = await Stock.findByIdAndUpdate(stockId, newStock, {
      new: true, // 업데이트된 문서를 반환
      runValidators: true, // 스키마 유효성 검사 실행
    });

    return updatedStock; // 업데이트된 주식 정보 반환
  } catch (error) {
    throw new Error('Stock update failed');
  }
};

// id에 해당하는 주식 삭제
export const deleteStock = async (id: string) => {
  await dbConnect();
  try {
    const data = await Stock.findByIdAndDelete(id);

    return data;
  } catch (error) {
    throw new Error('Stock delete failed');
  }
};

// stock에 로그 추가
export const addLogToStock = async (stockId: string, log: IStockLog) => {
  await dbConnect();
  try {
    const data = await Stock.findByIdAndUpdate(stockId, { $push: { logs: log } }, { new: true });

    return data;
  } catch (error) {
    throw new Error('StockLog add failed');
  }
};

// 특정 stock의 모든 로그 조회
export const getLogByStock = async (stockId: string) => {
  await dbConnect();
  try {
    const stock = await findStockDetailById(stockId);

    return stock?.logs!;
  } catch (error) {
    throw new Error('StockLog find failed');
  }
};

export const getStockByIds = async (stockIds: string[]) => {
  await dbConnect();
  const stocks = await Stock.find({ _id: { $in: stockIds } });

  return stocks;
};
