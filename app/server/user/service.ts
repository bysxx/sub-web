import dbConnect from 'app/server/db-connect';
import { startSession } from 'mongoose';

import * as roomRepo from '../room/Repository';
import * as stockRepo from '../stock/Repository';
import type { IUser } from './interfaces';
import * as userRepo from './Repository';

export async function getUser() {
  return userRepo.getUser();
}

export async function createUser({ name, roomId }: Pick<IUser, 'name' | 'roomId'>) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const room = await roomRepo.findRoomDetailById(roomId);
    if (!room) throw new Error('not found room');
    const user: IUser = {
      name,
      roomId,
      stockAsset: [],
      balance: room.setting.startBalance,
    };
    const data = await userRepo.createUser(user);
    await session.commitTransaction();
    session.endSession();
    return data;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

export async function deleteUser(id: string) {
  return userRepo.deleteUser(id);
}

export async function buyStock(userId: string, stockId: string, buyCount: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const user = await userRepo.findUserDetailById(userId);
    const stockAsset = await userRepo.findStockAssetByUserIdAndStockId(userId, stockId);
    const stock = await stockRepo.findStockDetailById(stockId);
    if (!stock) {
      throw new Error('stock not exist');
    }
    if (!stockAsset) {
      // 주식 보유하지 않음, 새로 추가
      if (user.balance < stock.price * buyCount) throw new Error('to less balance');
      const newBalace = user.balance - stock.price * buyCount;
      await userRepo.updateUser(userId, newBalace);
      const newStockAsset: IUserStockAsset = {
        stockId,
        count: buyCount,
        average: stock.price,
      };
      const data = await userRepo.addStockAssetToUser(userId, newStockAsset);
      console.log(data);
    } else {
      // 주식 이미 보유, 수량 증가
      if (user.balance < stock.price * buyCount) throw new Error('to less balance');
      const newBalace = user.balance - stock.price * buyCount;
      await userRepo.updateUser(userId, newBalace);
      const newCount = stockAsset.count + buyCount;
      const newAverage =
        (stockAsset.average * stockAsset.count + stock.price * buyCount) / (stockAsset.count + buyCount);
      await userRepo.updateStockAssetByUser(userId, stockId, newCount, newAverage);
    }

    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock purchased successfully.' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

export async function sellStock(userId: string, stockId: string, sellCount: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const user = await userRepo.findUserDetailById(userId);
    const stockAsset = await userRepo.findStockAssetByUserIdAndStockId(userId, stockId);
    const stock = await stockRepo.findStockDetailById(stockId);
    if (!stock) {
      throw new Error('stock not exist');
    }
    if (!stockAsset) {
      // 주식 보유하지 않음
      throw new Error('no have stock');
    } else {
      // 주식 이미 보유, 수량 감소
      if (stockAsset.count < sellCount) throw new Error('too less stock count');
      const newBalace = user.balance + stock.price * sellCount;
      await userRepo.updateUser(userId, newBalace);
      const newCount = stockAsset.count - sellCount;
      const newAverage = stockAsset.average;
      await userRepo.updateStockAssetByUser(userId, stockId, newCount, newAverage);
    }

    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock purchased successfully.' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}
