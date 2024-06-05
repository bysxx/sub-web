import dbConnect from 'app/server/db-connect';
import { startSession } from 'mongoose';

import * as roomRepo from '../rooms/repository';
import type { IUserStockAsset } from '../users/interfaces';
import * as userRepo from '../users/repository';
import type { IStock, IStockLog } from './interfaces';
import * as stockRepo from './repository';

export async function getStock() {
  return stockRepo.getStock();
}

export async function getOneStock(stockId: string) {
  try {
    const product = await stockRepo.findStockDetailById(stockId);

    return { success: true, message: 'One stock find successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function getStockUserRank(roomId: string, stockId: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const userIds = await roomRepo.getUserIdByRoom(roomId);

    const users = await Promise.all(
      userIds.map(async (userId) => {
        const user = await userRepo.findUserDetailById(userId);
        if (user) {
          const filteredAssets = user.stockAssets.filter((asset: IUserStockAsset) => asset.stockId === stockId);
          if (filteredAssets.length > 0) {
            return {
              _id: user._id,
              nickname: user.nickname,
              roomId: user.roomId,
              balance: user.balance,
              stockAssets: filteredAssets,
            };
          }
        }
        return null;
      }),
    );

    const product = users.filter((user) => user !== null);

    const sortedProduct = product.sort((a, b) => {
      const aCount = a?.stockAssets[0]?.count ?? 0;
      const bCount = b?.stockAssets[0]?.count ?? 0;
      return bCount - aCount;
    });

    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'User rank find successfully', product: sortedProduct };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: (error as Error).message };
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
    return { success: false, message: (error as Error).message };
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
    if (!stock) throw new Error('stock dose not exist');
    const oldValue = stock.value;
    const oldPrice = stock.price;
    const newPrice = oldPrice + oldPrice * ((newValue - oldValue) / (stock.valuePerRate * 100));
    const newStock: IStock = {
      price: newPrice,
      name: stock.name,
      description: stock.description,
      value: newValue,
      rate: (newValue - oldValue) / stock.valuePerRate,
      valuePerRate: stock.valuePerRate,
      logs: stock.logs,
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
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteStock(roomId: string, stockId: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    await roomRepo.removeStockIdFromRoom(roomId, stockId);
    const product = await stockRepo.deleteStock(stockId);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock delete successfully.', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: (error as Error).message };
  }
}
