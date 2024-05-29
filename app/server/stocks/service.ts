import dbConnect from 'app/server/db-connect';
import { startSession } from 'mongoose';

import * as roomRepo from '../rooms/repository';
import * as userRepo from '../users/repository';
import type { IStock } from './interfaces';
import * as stockRepo from './repository';

export async function getStock() {
  return stockRepo.getStock();
}

export async function getOneStock(stockId: string) {
  return stockRepo.findStockDetailById(stockId);
}

export async function getStockUserRank(roomId: string, stockId: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    console.log(stockId);
    const userIds = await roomRepo.getUserIdByRoom(roomId);
    console.log(userIds);
    const product: IUser[] = [];

    for (const userId of userIds) {
      const user = await userRepo.findUserDetailById(userId);

      if (user) {
        const hasStock = user.stockAssets.some((asset: IUserStockAsset) => asset.stockId === stockId);
        if (hasStock) {
          product.push(user);
        }
      }
    }

    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'User rank find successfully', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

export async function createStock(
  roomId: string,
  price: number,
  value: number,
  name: string,
  description: string,
  valuePerRate: number,
) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const stock: IStock = {
      price,
      value,
      name,
      description,
      rate: 0,
      valuePerRate,
      logs: [{ price, value, date: new Date() }],
    };
    const product = await stockRepo.createStock(stock);
    await roomRepo.addStockIdToRoom(roomId, product._id.toString());
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock create successfully', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

// stockId에 해당하는 주식의 value를 변경
export async function updateStockValue(stockId: string, newValue: number) {
  // 트랜잭션 시작
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const stock = await stockRepo.findStockDetailById(stockId);
    const oldValue = stock.value;
    const oldPrice = stock.price;
    const newPrice = oldPrice + oldPrice * ((newValue - oldValue) / (stock.valuePerRate * 100));
    const newStock: IStock = {
      price: newPrice,
      value: newValue,
      rate: (newValue - oldValue) / stock.valuePerRate,
    };
    await stockRepo.updateStock(stockId, newStock);
    const newLog: IStockLog = {
      price: newPrice,
      value: newValue,
      date: new Date(),
    };
    const product = await stockRepo.addLogToStock(stockId, newLog);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock update successfully.', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

export async function deleteStock(roomId: string, stockId: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    await roomRepo.removeStockIdFromRoom(roomId, stockId);
    const product = await stockRepo.deleteStock(stockID);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock delete successfully.', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}
