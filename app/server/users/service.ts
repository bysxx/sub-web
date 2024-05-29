import dbConnect from 'app/server/db-connect';
import { startSession } from 'mongoose';

import * as roomRepo from '../rooms/repository';
import * as stockRepo from '../stocks/repository';
import type { IUser } from './interfaces';
import * as userRepo from './repository';

export async function getUser() {
  return userRepo.getUser();
}

export async function getOneUser(userId: string) {
  return userRepo.findUserDetailById(userId);
}

export async function getTotalBalanceByUser(userId: string) {
  try {
    const user = await userRepo.findUserDetailById(userId);

    const stockValues = await Promise.all(
      user.stockAssets.map(async (asset) => {
        const stock = await stockRepo.findStockDetailById(asset.stockId);
        return stock ? stock.price * asset.count : 0;
      }),
    );

    // 유저의 잔고와 주식 자산의 합계
    const product = user.balance + stockValues.reduce((acc, value) => acc + value, 0);

    return { success: true, message: 'TotalBalance', product };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getStockChipByUserAndStock(userId: string, stockId: string) {
  try {
    const user = await userRepo.findUserDetailById(userId);
    const stock = await stockRepo.findStockDetailById(stockId);
    const stockAsset = user.stockAssets.find((asset) => asset.stockId === stockId);
    // 유저의 잔고와 주식 자산의 합계
    const Valuation = stockAsset.count * stockAsset.average;
    const ROI = (stock.price - stockAsset.average) / stockAsset.average;

    return {
      success: true,
      message: 'StockChip',
      product: {
        Valuation,
        ROI,
      },
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function createUser(countryCode: number, nickname: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const room = await roomRepo.findRoomDetailByCountryCode(countryCode);
    const roomId = room._id.toString();
    const user: IUser = {
      nickname,
      roomId,
      stockAsset: [],
      balance: room.setting.startBalance,
    };
    const product = await userRepo.createUser(user);
    await roomRepo.addUserIdToRoom(roomId, product._id.toString());
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'User create successfully', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

export async function buyStock(userId: string, stockId: string, buyCount: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const user = await userRepo.findUserDetailById(userId);
    const stockAsset = await userRepo.findStockAssetByUserIdAndStockId(userId, stockId);
    const stock = await stockRepo.findStockDetailById(stockId);
    if (user.balance < stock.price * buyCount) throw new Error('too less balance');
    const newBalace = user.balance - stock.price * buyCount;
    if (!stockAsset) {
      const newStockAsset: IUserStockAsset = {
        stockId,
        count: 0,
        average: 0,
      };
      await userRepo.addStockAssetToUser(userId, newStockAsset);
    }
    if (!stockAsset) {
      const newCount = buyCount;
      const newAverage = stock.price;
      await userRepo.updateStockAssetByUser(userId, stockId, newCount, newAverage);
    } else {
      const newCount = stockAsset.count + buyCount;
      const newAverage =
        (stockAsset.average * stockAsset.count + stock.price * buyCount) / (stockAsset.count + buyCount);
      await userRepo.updateStockAssetByUser(userId, stockId, newCount, newAverage);
    }
    const newUser: IUser = {
      balance: newBalace,
    };
    const product = await userRepo.updateUser(userId, newUser);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock purchased successfully.', product };
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
    // 주식 자체가 없음.
    if (!stock) {
      throw new Error('stock not exist');
    }
    // 주식 보유하지 않음
    if (!stockAsset) {
      throw new Error('no have stock');
    }
    // 주식 이미 보유, 수량 감소
    if (stockAsset.count < sellCount) throw new Error('too less stock count');
    const newBalace = user.balance + stock.price * sellCount;
    const newUser: IUser = {
      balance: newBalace,
    };
    await userRepo.updateUser(userId, newUser);
    const newCount = stockAsset.count - sellCount;
    const newAverage = stockAsset.average;
    const product = await userRepo.updateStockAssetByUser(userId, stockId, newCount, newAverage);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock purchased successfully.', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

export async function deleteUser(roomId: string, userId: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    await roomRepo.removeUserIdFromRoom(roomId, userId);
    const product = await userRepo.deleteUser(userId);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'User create successfully', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}
